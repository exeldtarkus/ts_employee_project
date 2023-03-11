/* eslint-disable @typescript-eslint/no-explicit-any */
import {cloudinary} from '../config/cloudinary_config';

const uploadCloudinary = async (
  base64Str: string,
  folder: string,
  public_id: string
) => {
  const options: any = {
    folder,
    overwrite: true,
    invalidate: true,
    quality: 1,
    public_id: public_id,
  };
  try {
    return await cloudinary.uploader.upload(base64Str, options);
  } catch (err: any) {
    console.log('err :', err);
    return err;
  }
};

export {uploadCloudinary};
