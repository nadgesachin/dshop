import axios from 'axios';
import { config } from '../config';
interface SignupPayload {
  name: string;
  email: string;
  photo: File | null;
  dob: string;
  password: string;
}

export const signupUser = async (data: SignupPayload) => {
  try {
    const response = await axios.post(`${config.backendBaseUrl}/auth/register`, data); // Replace with your actual endpoint
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Something went wrong. Please try again.';
    throw new Error(message);
  }
};
