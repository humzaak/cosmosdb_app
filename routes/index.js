const express = require('express');



const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');
const CosmosClient = require('@azure/cosmos').CosmosClient

//Using websocket to send cosmosdb data to client
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })




//DB config
const config = require('../config/keys').cosmosConfig;


const cosmosClient = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
})

async function connect() {
const { database } =  await cosmosClient.databases.createIfNotExists({ id: config.databaseId });
const { container } = await database.containers.createIfNotExists({ id: config.containerId });
return container
}


async function fetchSensorData(container,querySpec) {
    const { resources: results } = await container.items.query(querySpec).fetchAll();
    let dataPoints = []
    for (const itemDef of results) {
        dataPoints.push(itemDef.sensor_00);
        dataPoints.push(itemDef.sensor_01);
        dataPoints.push(itemDef.sensor_02);
        dataPoints.push(itemDef.sensor_03);
        dataPoints.push(itemDef.sensor_04);
        dataPoints.push(itemDef.sensor_05);
      }
    return dataPoints
}
    

var containerID = -1


    connect().then(
        (container)=>
        {
    wss.on('connection', ws => {
    setInterval(()=>{
         containerID > 1000 ? 0: containerID++;
            const querySpec = {
                query: "SELECT * FROM c where c.id = @id",
                parameters: [
                  {
                    name: "@id",
                    value: containerID.toString()
                  }
                ]
              };
       fetchSensorData(container,querySpec).then((dataPoints)=>{
            console.log(dataPoints)
             dataPoints.push(containerID)
            ws.send(dataPoints.toString())
          })
        },1000);

  })
        });




// Welcome page
router.get('/', (req,res) => res.render('welcome'));



//Dashboard
router.get('/dashboard',ensureAuthenticated, (req,res) => {
    res.render('dashboard',{id : req.user.name})

});




module.exports = router;