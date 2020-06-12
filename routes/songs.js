var express = require('express');
var router = express.Router();
const db = require('../bd/connection');
const multipart = require('connect-multiparty');

/* GET Song listing. */
router.get('/', function (req, res, next) {
    let where = req.query.artist ? ` WHERE artist_id = ${req.query.artist}` : '';
    let query = 'SELECT * FROM song' + where;

    db.query(query, function (err, results) {
        let response = {
            "success": err ? false : true,
            "message": "",
            "data": {}
        }

        if (err) {
            response.message = 'Error in get Songs process'
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
    uploadDir: './uploads/song'
});

/* POST Song */
router.post('/', multipartMiddleware, function (req, res, next) {
    let body = req.body;
    let imgPath = req.files.uploads.find(obj => { return obj.type.indexOf('image') === -1 ? false : true }).path.split('/').pop();
    let songPath = req.files.uploads.find(obj => { return obj.type.indexOf('audio') === -1 ? false : true }).path.split('/').pop();

    let query = `INSERT INTO song (title, genre, release_year, artist_id, album, length, img_path, song_path)
                 VALUES ('${body.title}','${body.genre}', '${body.releaseYear}', ${parseInt(body.artistId)}, '${body.album}', '${body.lenght}', '${imgPath}', '${songPath}')`;

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