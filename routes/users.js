var express = require('express');
var router = express.Router();

const AwsBucketController = require('../controllers/AwsBucketController');
const AwsBucketControllerObj = new AwsBucketController();

/* GET users listing. */
router.post('/', [
  AwsBucketControllerObj.createBucket
]);

module.exports = router;
