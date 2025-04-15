// src/services/promotionService.ts

import axios from 'axios';
import { config } from '../config'; // adjust path if needed

const BASE_URL = `${config.backendBaseUrl}`;

export const getAllPromotions = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/promotions/getall`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addPromotion = async (formData: any) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/promotions/save`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const updatePromotion = async (id: string, formData: FormData) => {
    const response = await axios.put(`${BASE_URL}/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deletePromotion = async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
};
