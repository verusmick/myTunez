var express = require('express');
var router = express.Router();
const db = require('../bd/connection')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    
  // db.query('SELECT * FROM  user', function (err, results) {
  //   if (err) throw err
  //   return res.json(results)
  // })
});

module.exports = router;
