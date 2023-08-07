import { NextApiRequest, NextApiResponse } from 'next';

import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  //const session = await getSession({ req });

  // Update AWS configuration with the provided credentials

  const region = process.env.S3_UPLOAD_REGION;
  const s3Bucket = process.env.S3_UPLOAD_BUCKET;

  //   const s3 = new AWS.S3({
  //   signatureVersion: 'v4',
  //   region: region,
  //   accessKeyId: process.env.AWS_ACCESS_KEY,
  //   secretAccessKey: process.env.AWS_SECRET_KEY,
  // })

  aws.config.update({
    signatureVersion: 'v4',
    region: region,
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET
  });

  // Create a new instance of S3
  const s3 = new aws.S3({
    signatureVersion: 'v4',
    region: region,
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET
  });
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const randKey = uuidv4();

  const s3Params = {
    Bucket: s3Bucket,
    Key: `${randKey}${fileName}`,
    ContentType: fileType,
    ACL: 'public-read'
  };

  try {
    // Get a signed URL from S3 for uploading an object
    s3.getSignedUrl('putObject', s3Params, async (err, data) => {
      if (err) {
        console.log(7788, err);
        return res.json({ success: false, error: err });
      }
      const returnData = {
        signedRequest: data,
        url: `https://${s3Bucket}.s3.amazonaws.com/${randKey}${fileName}`
      };

      return res.status(200).json(returnData);
    });
  } catch (err) {
    console.error(9900, err);
    return res.status(500).json(err);
  }
}
