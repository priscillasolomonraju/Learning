const Validator = require('validatorjs');

const ResponseService = require('../services').ResponseService;
const responseServiceObj = new ResponseService();

const AwsBucketService = require('../services').AwsBucketService;
const AwsBucketServiceObj = new AwsBucketService();

module.exports = class AwsBucketController {

    constructor() {}

    createBucket( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                bucketName: 'required',
                acl: 'required',
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            AwsBucketServiceObj.createBucket(in_data)
            .then( (result) => {
                return responseServiceObj.sendResponse( res, {
                    msg : 'success',
                    data: result
                } );
            } )
            .catch( (ex) => {
                
                return responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    getBucketList( req, res, next ) {

        try {

            AwsBucketServiceObj.getBucketList()
            .then( (result) => {
                return responseServiceObj.sendResponse( res, {
                    msg : 'success',
                    data: result
                } );
            } )
            .catch( (ex) => {
                
                return responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } )

        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    uploadFileToBucket( req, res, next ) {

        try {

            let in_data = req.body;
            let rules = {
                bucketName: 'required',
                fileName: 'required',
                fileContent: 'required',
            };
            let validation = new Validator(in_data, rules);
            if( validation.fails() ) {

                return responseServiceObj.sendException( res, {
                    msg : responseServiceObj.getFirstError( validation )
                } );
            }

            AwsBucketServiceObj.uploadFileToBucket( in_data )
            .then( (result) => {
                return responseServiceObj.sendResponse( res, {
                    msg : 'success',
                    data: result
                } );
            } )
            .catch( (ex) => {
                
                return responseServiceObj.sendException( res, {
                    msg : ex.toString()
                } );
            } );
        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }

    uploadExternalFileToBucket( req, res, next ) {

        try {

            // let validation = new Validator(in_data, rules);
            // if( validation.fails() ) {

            //     return responseServiceObj.sendException( res, {
            //         msg : responseServiceObj.getFirstError( validation )
            //     } );
            // }

            return responseServiceObj.sendResponse( res, {
                msg : 'uploadExternalFileToBucket',
                data: req.params.imageDetails
            } );

        } catch( ex ) {

            return responseServiceObj.sendException( res, {
                msg : ex.toString()
            } );
        }
    }
}