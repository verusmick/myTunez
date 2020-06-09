var express = require('express');
var router = express.Router();
const db = require('../bd/connection');
const multipart = require('connect-multiparty');

/* GET artist listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');    
});

const multipartMiddleware = multipart({
    uploadDir: './uploads/img'
});

/* POST artist listing. */
router.post('/', multipartMiddleware, function (req, res, next) {
    res.json({
        'message': 'File uploaded succesfully.'
    });
});


module.exports = router;