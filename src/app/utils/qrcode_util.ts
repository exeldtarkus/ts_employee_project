import QRCode from 'qrcode';
import sharp from 'sharp';
import wrap from 'word-wrap';
import {IGenerateQrCode} from '../models/repository_models/IQrCodeRepositoryModel';

const generateQRCode = async (param: IGenerateQrCode) => {
  const qr = await getQR(param);
  return 'data:image/svg+xml;base64,' + qr.toString('base64');
};

const getQR = async (param: IGenerateQrCode): Promise<Buffer> => {
  const logoBuffer = await sharp(
    './storage/logo/moservice-logo-qr.png'
  ).toBuffer();

  const buff = await QRCode.toBuffer(param.data, {
    errorCorrectionLevel: 'H',
    margin: 0,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  const bengkelNameArr = wrap(param.bengkelName, {width: 24}).split('\n');

  const baseImage = `
    <svg width="300" height="450">
      <style>
        .base { 
          fill: white !important;
          width: 100%;
          height: 100%;
        }
        .title { fill: #001; font-size: 20px; font-weight: normal; color: black; font-family: 'DM Sans'}
        .title-bengkel { fill: #001; font-size: 20px; font-weight: bold; color: black; font-family: 'DM Sans'}
      </style>
      <rect class="base"></rect>
      <text x="50%" y="50" text-anchor="middle" class="title">Gunakan Sebelum</text>
      <text x="50%" y="76" text-anchor="middle" class="title">${
        param.strDate
      }</text>
      <g>
        <text x="0" y="375">
          ${bengkelNameArr.map(row => {
            return `<tspan text-anchor="middle" x="50%" dy="1.2em" class="title-bengkel">${row}</tspan>`;
          })}
        </text>
      </g>
    </svg>
    `;

  const baseBuffer = Buffer.from(baseImage);

  const qrBuffer = await sharp(buff)
    .resize(260, 260, {fit: 'contain'})
    .toBuffer();

  return sharp(baseBuffer)
    .composite([
      {
        input: qrBuffer,
        top: 97,
        left: 20,
      },
      {
        input: logoBuffer,
        top: 209,
        left: 132,
      },
    ])
    .png({
      quality: 50,
    })
    .toBuffer();
};

export {generateQRCode};
