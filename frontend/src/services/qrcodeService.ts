import axios from 'axios';
import { config } from '../config';

export const getAllQRCodes = async () => {
  const response = await axios.get(`${config.backendBaseUrl}/qrcode/all`);
  return response.data.data;
};

export const createQRCode = async (svg: string, count: number) => {
  const response = await axios.post(`${config.backendBaseUrl}/qrcode/save`, {
    svg,
    count,
  });
  return response.data;
};
