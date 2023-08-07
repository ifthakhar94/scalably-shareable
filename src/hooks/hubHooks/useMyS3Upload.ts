import { S3 } from 'aws-sdk';
import { useState } from 'react';

import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
const useMyS3Upload = (givenAllowedTypes: any, singleUpload: boolean = true) => {
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_S3_REGION
  });

  const [location, setLocation] = useState('');

  let result: any = '';
  let error;
  const handleFileChange: any = async (e: any) => {
    e.preventDefault();

    if (doValidate(e.target.files![0])) {
      let result1 = await doUpload(e.target.files![0]);

      const { Location }: any = result1;
      setLocation(Location);
    }
  };

  const allowedTypes = Array.isArray(givenAllowedTypes) && givenAllowedTypes.length == 0 ? ['image/jpeg', 'image/png'] : givenAllowedTypes;

  const doValidate = (file: any) => {
    if (!file) return;
    if (allowedTypes.indexOf(file.type) == -1) {
      toast.error('ファイルの拡張子は.jpg、.pngのどちらかのものを設定してください');
      return false;
    }

    if (file?.size > 2000000) {
      toast.error('ファイルサイズは2MB以内で設定してください');
      return false;
    }

    return true;
  };

  const doUpload = async (file: any) => {
    setLocation('');
    const randKey = uuidv4();
    const fileRandName = `${randKey}${file?.name}`;

    const params = {
      Bucket: `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}`,
      Key: fileRandName,
      Body: file
    };

    try {
      const upload = s3.upload(params);
      //  setUpload(upload);
      upload.on('httpUploadProgress', (p) => {});
      const uploadResult = await upload.promise();
      result = uploadResult;
    } catch (err) {
      error = JSON.stringify(err);
    }

    return result;
  };
  return { handleFileChange, location };
};

export default useMyS3Upload;
