// src/services/productService.ts
import axios from 'axios';
import { config } from '../config';

const API_BASE = config.backendBaseUrl;

const multipartHeaders = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
interface ProductListResponse {
  success: boolean;
  data: Product[];
  total: number;
  page: number;
  totalPages: number;
}
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
export const getAllProducts = async (
  page = 1,
  limit = 10
): Promise<ProductListResponse> => {
  try {
    const { data } = await axios.get(`${API_BASE}/products?page=${page}&limit=${limit}`);
    return data; // ✅ return full response object
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// GET product by ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await axios.get(`${API_BASE}/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// CREATE product
export const createProduct = async (formData: FormData): Promise<Product> => {
  try {
    const { data } = await axios.post(`${API_BASE}/products/`, formData, multipartHeaders);
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// UPDATE product
export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
  try {
    const { data } = await axios.put(`${API_BASE}/products/${id}`, formData, multipartHeaders);
    return data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

// DELETE product
export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await axios.delete(`${API_BASE}/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
