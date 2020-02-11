const express = require('express');

const user = express.Router();
/**
 * @route api/users/test
 * @desc test
 * @access public
 */
user.get('/test', (req, res) => {
    res.json({
        msg: 'server worked'
    })
});

module.exports = user;