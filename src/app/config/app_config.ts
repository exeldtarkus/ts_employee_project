import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
  debug: process.env.APP_DEBUG === 'true',
};

export {appConfig as config};
