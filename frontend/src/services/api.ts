import axios from 'axios';
import { Product, Review, ContactFormData, LoginFormData, AuthResponse } from '../types';
import { config } from '../config';

const API_URL = config.backendBaseUrl;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
  create: async (data: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },
  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};

export const reviewService = {
  getAll: async (): Promise<Review[]> => {
    const response = await api.get<Review[]>('/reviews');
    return response.data;
  },
  create: async (data: Omit<Review, 'id' | 'date'>): Promise<Review> => {
    const response = await api.post<Review>('/reviews', data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/reviews/${id}`);
  },
};

export const contactService = {
  sendMessage: async (data: ContactFormData): Promise<void> => {
    await api.post('/contact', data);
  },
};

export default api; 