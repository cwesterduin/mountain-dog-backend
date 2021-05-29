var AWS = require('aws-sdk')
var fs = require('fs');
require('dotenv').config()

// For dev purposes only
AWS.config.update({ accessKeyId: process.env.KEY, secretAccessKey: process.env.SECRET_KEY });

s3 = new AWS.S3({apiVersion: '2006-03-01'});
// Read in the file, convert it to base64, store to S3

function uploadToS3(data, path){
    var uploadParams = {Bucket: 'temp93i320', Key: `files/${path}`, Body: data};
    // call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  });
};

async function srcFromS3(){
  var bucketParams = {
    Bucket : 'alfie192345',
    Prefix: 'images'
  };// Call S3 to obtain a list of the objects in the bucket
  const res = await s3.listObjectsV2(bucketParams).promise();
  return res.Contents
};

module.exports = { uploadToS3, srcFromS3 }