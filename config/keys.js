const config = {};

config.host =  "https://trumarinetester.documents.azure.com:443/";
config.authKey = "XbjWZpNRjdJH8CL4ruLxpgvdEHuY0yA5yJ8DcQXwaSsh369TAozcwvtdy9S8DNAX8tSXOPW74mvz8aQUIuGxKQ==";
config.databaseId = "sensordata";
config.containerId = "data";


dbPassword = 'mongodb+srv://YOUR_USER_NAME:'+ encodeURIComponent('YOUR_PASSWORD') + 'YOUR_CLUSTER_ADDRESS';

module.exports = {
    mongoURI: dbPassword,
    cosmosConfig: config
};
