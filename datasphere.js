/* =====================================================================
    Modules
=======================================================================*/

// Logs
const Log = require('./lib/logger');

Log.info('Datasphere is alive!');

// Env variables
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env'});

// Express
const express = require('express');
const app = express();
// Body Parser
app.use(express.json());

