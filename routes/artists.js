var express = require('express');
var router = express.Router();
const db = require('../bd/connection');
const multipart = require('connect-multiparty');

/* GET artist listing. */
router.get('/', function (req, res, next) {
    db.query('SELECT * FROM  artist', function (err, results) {
        let response = {
            "success": err ? false : true,
            "message": "",
            "data": {}
        }

        if (err) {
            response.message = 'Error in get Artists process'
        } else {
            response.message = 'Data Found'
            response.data = {
                requests: results
            }

        }
        return res.json(response)
    })
});

const multipartMiddleware = multipart({
    uploadDir: './uploads/artist'
});

/* POST artist */
router.post('/', multipartMiddleware, function (req, res, next) {
    let body = req.body;
    let imgPath = req.files.uploads ? req.files.uploads[0].path.split('/').pop() : 'defaultImg.png';
    let query = `INSERT INTO artist (name, genres, members, website, img_path)     
    VALUES ('${body.name}', '${body.genres}', '${body.members}', '${body.website}', '${imgPath}')`;

    db.query(query, function (err, results) {
        let response = {
            "success": err ? false : true,
            "message": "",
            "data": {}
        }

        if (err) {
            response.message = err.sqlMessage
        } else {
            response.message = 'Artist added succesfully'
            response.data = results
        }
        return res.json(response)
    })
});


module.exports = router;