const express = require('express');

const {
    postDataToSphere,
    postLoadTestDataToSphere
} = require('../controllers');

const router = express.Router();

router.route('/datasphere')
            .post(postDataToSphere);

router.route('/load')
            .post(postLoadTestDataToSphere);

module.exports = router;