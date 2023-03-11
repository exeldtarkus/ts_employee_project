import dotenv from 'dotenv';

dotenv.config();

const storage = {
  base_upload_path: process.env.APP_ENV === 'production' ? 'prod' : 'dev',
};

export {storage};
