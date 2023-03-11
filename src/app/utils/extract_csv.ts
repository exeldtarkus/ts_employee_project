/* eslint-disable @typescript-eslint/no-explicit-any */
import {createReadStream} from 'fs';

const csvParser = require('csv-parser');

const extractCSV = async (fileDir: string) => {
  const result: Array<any> = [];
  return new Promise((resolve, reject) => {
    createReadStream(fileDir)
      .on('error', error => {
        reject(error);
      })
      .pipe(csvParser())
      .on('data', (row: Array<any>) => {
        result.push(row);
      })
      .on('end', () => {
        resolve(result);
      });
  });
};

export {extractCSV};
