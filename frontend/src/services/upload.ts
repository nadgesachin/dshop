//api call to upload image to cloudinary
import axios from 'axios';
import { config } from '../config';

export const uploadImage = async (formData: FormData) => {
  const response = await axios.post(`${config.backendBaseUrl}/upload/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
