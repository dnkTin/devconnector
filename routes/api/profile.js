const express = require('express');

const profile = express.Router();


/**
 * @route api/profile/test
 * @desc test
 * @access public
 */
profile.get('/test', (req, res) => {
    res.json({
        msg: 'server worked'
    })
});

module.exports = profile;