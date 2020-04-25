const constants = require('../lib/constants');
const Log = require('../lib/logger');
const Broker = require('./broker');
const mq = new Broker(constants.MQ_HOST);

class DataManager {
    constructor() {
        this.dataStoreQueue = constants.DATASTORE_QUEUE;
        this.broadcastQueue = constants.BROADCAST_QUEUE;
    }

    storeData(data) {
        Log.info(`data.manager.store ${this.dataStoreQueue}`);  
        this.pushToQueue(data, this.dataStoreQueue);
    }

    broadcastData(data) {
        Log.info(`data.manager.broadcast ${this.broadcastQueue}`);
        this.pushToQueue(data, this.broadcastQueue);
    }

    pushToQueue(data, queue) {
        try {
            mq.push(this.dataToJSON(data),  queue);
        } catch(err) {
            Log.error(`data.manager.push.queue.error ${queue} ${err}`);   
            Log.error(`data.manager.push.queue.error.data ${queue} ${JSON.stringify(data)}`); 
        }
    }

    dataToJSON(data) {
        if (Object.keys(data).length === 0 && data.constructor !== Object) {
            return JSON.parse(data);
        } 
        return data;
    }
}

module.exports = DataManager;