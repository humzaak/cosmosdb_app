
## Nodejs CosmosDB app

This app downloads sensor data from cosmosdb every second and then displays it on a simple chart. It also has user authentication built in

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5001
```

### MongoDB

Open "config/keys.js" and add your MongoDB URI, local or Atlas

### CosmosDB

Open "config/keys.js" and add your CosmosDB details like host and authkey