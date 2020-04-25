/* =====================================================================
    The Earth Datasphere - EarthX 2020 Hackhathon
=======================================================================*/
/* =====================================================================
    Load Modules
=======================================================================*/

// Logs
const Log = require('./lib/logger');

Log.info('The Earth DataSphere is Live!');

// Env variables
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});

// Express
const express = require('express');
const app = express();
// Body Parser
app.use(express.json());

const constants = require('./lib/constants');

// P2P Server
const P2pServer = require('./server/p2p');
const p2p = new P2pServer();

/* =====================================================================
    Datasphere API
=======================================================================*/
// Route files 
const routes = require('./routes');

// Mount routers
app.use('/api/v1', routes); // => call localhost:3001/api/v1/datasphere

const server = app.listen(constants.HTTP_PORT, () => {
    Log.info(`app.server.listen.port ${constants.HTTP_PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    Log.error(`process.unhandled.rejection ${err.message}`);
    // Close server and exit process
    server.close(() => process.exit(1));
});

/* ===================================================================================
    DataSphere P2P Server
=====================================================================================*/

p2p.listen(constants.P2P_PORT);