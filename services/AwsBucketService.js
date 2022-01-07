require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    "region": "sa-east-1"   
}); 

const s3 = new AWS.S3();

module.exports = class AwsBucketService {

    constructor() {}

    async createBucket( in_data ) {

        try {

            // let params = {
            //     Bucket: 'wornoffkeys12',
            //     ACL: "public-read"
            // };

            let params = {
                Bucket: in_data.bucketName,
                ACL: in_data.acl
            };
        
            return await new Promise( (resolve, reject) => {
                s3.createBucket(params, (err, results) => {
                    if( err ) {
                        console.log('err', err.stack);
                        reject(err);
                    } else {
                        console.log('results', results);
                        resolve(results);
                    }
                })
            } );
        } catch( ex ) {
            console.log('createBucket ex', ex);
            throw ex;
        }
    }

    async getBucketList() {

        try {

            return await new Promise( (resolve, reject) => {
                s3.listBuckets(function(err, data) {
                    if (err) {
                      console.log("Error", err);
                      reject(err);
                    } else {
                      console.log("Success", data.Buckets);
                      resolve(data);
                    }
                });
            });
        } catch (ex) {
            console.log('getBucketList ex', ex);
            throw ex;
        }  
    }

    async uploadFileToBucket( in_data ) {

        try {

            // let params = {
            //     Bucket: 'makersquest1',
            //     Key: 'mykey.txt',
            //     Body: "HelloWorld"
            // };

            let params = {
                Bucket: in_data.bucketName,
                Key: in_data.fileName,
                Body: in_data.fileContent
            };

            return await new Promise( (resolve, reject) => {

                s3.putObject(params, function (err, res) {
                    if (err) {
                        console.log("Error uploading data: ", err);
                        reject( err );
                    } else {
                        console.log("Successfully uploaded data to myBucket/myKey");
                        resolve( res );
                    }
                });
            });
        } catch( ex ) {

            console.log('createBucket ex', ex);
            throw ex;
        }
    }

    async uploadExternalFileToBucket() {}
}