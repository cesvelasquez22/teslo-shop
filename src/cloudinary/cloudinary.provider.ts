import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants/cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    // console.log({
    //   CLOUD_NAME: process.env.CLOUD_NAME,
    //   CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    //   CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    // });
    return v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  },
};
