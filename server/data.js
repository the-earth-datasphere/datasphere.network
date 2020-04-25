const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi');
const Log = require('../lib/logger');

class Data {
    static validateDataObject(data) {
        try {
            const schema = Joi.object({
                header: Joi.object({
                    ID : Joi.string().required(),
                    correlationID : Joi.string().required(),
                    token: Joi.string(),
                    status : Joi.string().required(),
                    type: Joi.string(),
                    timestamp: Joi.number().required(),
                    redelivered: Joi.boolean().required()
                }),
                reqHeaders: Joi.object(),
                data : Joi.object().required()
            });

            const dataObj = (typeof data === 'string' || data instanceof String) ? JSON.parse(data) : data;
            const { error, value } = schema.validate(dataObj);

            Log.info(`data.validate ID ${dataObj.header.ID} correlationID ${dataObj.header.correlationID}`);
            
            if (error !== undefined) {                
                Log.info(`data.validate.invalid ID ${dataObj.header.ID} correlationID ${dataObj.header.correlationID} ${error}`);
                return false;             
            } 

            Log.info(`data.validate.valid ID ${dataObj.header.ID} correlationID ${dataObj.header.correlationID}`);
            return true;

        }
        catch (err) {
            Log.error(`data.validate.error ${err}`);
            return false;   
        } 
    }

    static buildDataObject(req, params) {
        let data = {};
        try {

            data.header = {};
            data.header.ID = uuidv4();
            data.header.correlationID = uuidv4();
            data.header.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
            data.header.status = 'created';
            data.header.timestamp = Date.now();

            // Check if data has additional params
            if (params !== undefined) {
                data.header.ID = (params.ID !== undefined) ? params.ID : data.header.ID;
                data.header.correlationID = (params.correlationID !== undefined) ? params.correlationID : data.header.correlationID;
                data.header.type = (params.type !== undefined) ? params.type : '';
                data.header.status = (params.status !== undefined) ? status : data.header.status;
                data.header.timestamp = (params.timestamp !== undefined) ? params.timestamp : data.header.timestamp;
                data.reqHeaders = (params.reqHeaders) ? req.headers : {};
            }
            data.header.redelivered = false;
            data.data = req.body; 

            Log.info(`data.build.id ${data.header.ID}`);
            Log.info(`data.build.correlation.id ${data.header.correlationID}`);

        } catch (err) {
            Log.error(`data.build.error ${err}`);
        }
        return data;
    }
}

module.exports = Data;