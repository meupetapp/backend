import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const getSignedUrlForUpload = async (key: string, isPublic: boolean = false) => {
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });
  
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); 
    return signedUrl;
  };

  export const getSignedUrlForDownload = async (key: string) => {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });
  
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); 
    return signedUrl;
  };