import AWS = require("aws-sdk");
import { config } from "./config/config";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;

// Configure AWS
AWS.config.update({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY});
AWS.config.region = AWS_REGION;

export const s3 = new AWS.S3();

// const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
// console.log('THE CREDENTIALS: ', credentials)
// AWS.config.credentials = credentials;
//
// export const s3 = new AWS.S3({
//   signatureVersion: "v4",
//   region: config.aws_region,
//   params: { Bucket: config.aws_media_bucket },
// });

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl("getObject", {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl("putObject", {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
