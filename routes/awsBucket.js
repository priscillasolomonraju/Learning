require('dotenv').config();

var path = require('path');
var express = require('express');
var router = express.Router();

const AwsBucketController = require('../controllers/AwsBucketController');
const AwsBucketControllerObj = new AwsBucketController();

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    "region": "sa-east-1"
}); 
const s3 = new AWS.S3();
var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {

        let id = Math.floor(Math.random() * 1000000000 );
        let originalname = file.originalname;
        let newFileName = id;
        let extention = path.extname(originalname);
        let fullFileName = newFileName + '-' + originalname.split('.')[0] + '-' + extention;
        // let fullFileNameWithPath = userImagePath +'/'+ fullFileName;
        req.params.imageDetails = {
            fileOriginalname : originalname,
            newFileName : newFileName,
            fileExtention : extention,
            fullFileName : fullFileName,
            // fullFileNameWithPath : fullFileNameWithPath
        };
        console.log('req.params.imageDetails', req.params.imageDetails);
        cb(null , fullFileName );
        // cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
});

/* GET users listing. */
router.post('/upload-file', [
    AwsBucketControllerObj.uploadFileToBucket
]);

router.post('/upload-external-file', upload.array('files', 1), [
    AwsBucketControllerObj.uploadExternalFileToBucket
]);

router.post('/', [
  AwsBucketControllerObj.createBucket
]);

router.get('/', [
    AwsBucketControllerObj.getBucketList
]);

module.exports = router;
