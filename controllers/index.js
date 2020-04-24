const Log = require('../lib/logger');


// @desc    Post Data to Sphere
// @route   POST api/v1/datasphere
// @access  Public

exports.postDataToSphere = async (req, res, next) => {
    try {

        Log.info(`app.server.post.data.request ${req.method} ${req.originalUrl}`);

        Log.info(`app.server.post.response.response ${req.method} ${req.originalUrl} 200`);

        res.status(200).json({success: true});
    } catch (err) {
        Log.error(`app.server.post.data.response ${req.method} ${req.originalUrl} 400 ${err}`);
        res.status(400).json({
            success: false, 
            error: err
        }); 
    }
}
