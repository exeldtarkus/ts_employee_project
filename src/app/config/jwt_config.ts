import dotenv from 'dotenv';

dotenv.config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

interface IParamsToken {
  sub?: string;
  iat?: number;
  exp?: number;
}

const generateTokenUser = async (payload: IParamsToken) => {
  const token = jwt.sign(payload, secret, {algorithm: 'HS512'});
  return token;
};

export {generateTokenUser};
