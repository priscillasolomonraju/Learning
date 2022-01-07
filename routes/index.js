var express = require('express');
var router = express.Router();
const awsBucket = require('./awsBucket');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/awsbucket', awsBucket);

module.exports = router;
