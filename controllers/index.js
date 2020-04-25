const Log = require('../lib/logger');
const DataManager = require('../server/data-manager');
const Data = require('../server/data');
const dm = new DataManager();

// @desc    Post Data to Sphere
// @route   POST api/v1/datasphere
// @access  Public

exports.postDataToSphere = async (req, res, next) => {
    try {
        Log.info(`app.server.post.data.request ${req.method} ${req.originalUrl}`);

        const params = {
            type : 'standard',
            reqHeaders: false 
        };

        const dataObject = Data.buildDataObject(req, params);

        dm.storeData(dataObject);
        dm.broadcastData(dataObject);

        Log.info(`app.server.post.data.response ${req.method} ${req.originalUrl} 200`);

        res.status(200).json({success: true});
    } catch (err) {
        Log.error(`app.server.post.data.response ${req.method} ${req.originalUrl} 400 ${err}`);
        res.status(400).json({
            success: false, 
            error: err
        }); 
    }
}
