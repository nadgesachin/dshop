// src/services/productService.ts
import axios from 'axios';
import { config } from '../config';

const API_BASE = config.backendBaseUrl;

// Define Product type if needed
export interface Category {
  _id?: string;
  name: string;
  description: string;
  createdAt?: string;
}

// GET all products
export const getAllCategories = async (): Promise<any> => {
  try {
    const data= await axios.get(`${API_BASE}/categories/getall`);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// GET product by ID
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const { data } = await axios.get(`${API_BASE}/categories/get/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// CREATE product
export const createCategory = async (formData: any): Promise<Category> => {
  try {
    const { data } = await axios.post(`${API_BASE}/categories/save`, formData);
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// UPDATE product
export const updateCategory = async (id: string, formData: FormData): Promise<Category> => {
  try {
    const { data } = await axios.put(`${API_BASE}/products/${id}`, formData);
    return data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

// DELETE product
export const deleteCategory = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await axios.delete(`${API_BASE}/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
