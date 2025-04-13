import axios from 'axios';
import { config } from '../config';
const API_URL = config.backendBaseUrl;

export interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  product: string;
  comment: string;
  photos?: string[];
  profilePhoto?: string;
  status: string;
  createdAt: string;
}

export interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  product: string;
  comment: string;
  photos?: string[];
  profilePhoto?: string;
}

export const submitReview = async (formData: any): Promise<Review> => {
  try {
    console.log('Submitting review with form data to:', formData);
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/reviews`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to submit review');
    }

    return response.data.review;
  } catch (error) {
    console.error('Error submitting review:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to submit review');
    }
    throw error;
  }
};

export const getReviews = async (): Promise<Review[]> => {
  try {
    console.log('Fetching reviews from:', API_URL);
    const response = await axios.get(`${API_URL}/reviews/approved`);
    return response.data.reviews || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  try {
    console.log('Fetching product reviews from:', API_URL);
    const response = await axios.get(`${API_URL}/reviews/product/${productId}`);
    return response.data.reviews || [];
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return [];
  }
}; 

export const deleteReview = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Example API function (adjust URL as needed)
export const fetchReviews = async (page = 1) => {
  try {
    const res = await axios.get(`${API_URL}/reviews?page=${page}`);
    return res.data; 
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

