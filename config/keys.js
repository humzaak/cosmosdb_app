const config = {};

config.host =  "YOUR_HOST_URL_HERE";
config.authKey = "YOUR_AUTH_KEY_HERE";
config.databaseId = "YOUR_DATABASE_ID_HERE";
config.containerId = "YOUR_CONTAINER_ID_HERE";


dbPassword = 'mongodb+srv://YOUR_USER_NAME:'+ encodeURIComponent('YOUR_PASSWORD') + 'YOUR_CLUSTER_ADDRESS';

module.exports = {
    mongoURI: dbPassword,
    cosmosConfig: config
};
