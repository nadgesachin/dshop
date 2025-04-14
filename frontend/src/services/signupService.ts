import axios from 'axios';
import { config } from '../config';
interface SignupPayload {
  name: string;
  email: string;
  photo: string | null;
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

export const getUser = async (token: string|null) => {
  try {
    if(!token) return 'token not found';
    const response = await axios.get(`${config.backendBaseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Something went wrong. Please try again.';
    throw new Error(message);
  }
}
export const getUserProfile = async (token: string|null) => {
  try {
    if(!token) return 'token not found';
    const response = await axios.get(`${config.backendBaseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Something went wrong. Please try again.';
    throw new Error(message);
  }
}

export const getAllUsers = async (token: string|null) => {
  try {
    if(!token) return 'token not found';
    const response = await axios.get(`${config.backendBaseUrl}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Something went wrong. Please try again.';
    throw new Error(message);
  }
}

