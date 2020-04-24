const express = require('express');

const {
    postDataToSphere
} = require('../controllers');

const router = express.Router();

router.route('/datasphere')
            .post(postDataToSphere);

module.exports = router;