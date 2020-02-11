const express = require('express');

const posts = express.Router();
/**
 * @route api/posts/test
 * @desc test
 * @access public
 */
posts.get('/test', (req, res) => {
    res.json({
        msg: 'server worked'
    })
});

module.exports = posts;