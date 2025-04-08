import axios from 'axios';

// Use Vite's import.meta.env for environment variables
const API_URL = import.meta.env.VITE_API_URL || 'https://a755-203-110-85-132.ngrok-free.app/api';

export interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  product: string;
  comment: string;
  photos?: string[];
  status: string;
  createdAt: string;
}

export interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  product: string;
  comment: string;
  photos?: File[];
}

export const submitReview = async (formData: FormData): Promise<Review> => {
  try {
    console.log('Submitting review with form data to:', API_URL);
    const response = await axios.post(`${API_URL}/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

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