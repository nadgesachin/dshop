// src/services/productService.ts
import axios from 'axios';
import { config } from '../config';

const API_BASE = config.backendBaseUrl;

const multipartHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// Define Product type if needed
export interface Product {
  _id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
  images: {
    public_id: string;
    url: string;
  }[];
  createdAt?: string;
}

// GET all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get(API_BASE);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// GET product by ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await axios.get(`${API_BASE}/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// CREATE product
export const createProduct = async (formData: FormData): Promise<Product> => {
  try {
    const { data } = await axios.post(API_BASE, formData, multipartHeaders);
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// UPDATE product
export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
  try {
    const { data } = await axios.put(`${API_BASE}/${id}`, formData, multipartHeaders);
    return data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

// DELETE product
export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await axios.delete(`${API_BASE}/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
