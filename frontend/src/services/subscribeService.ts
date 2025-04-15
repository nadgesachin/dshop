//api call to upload image to cloudinary
import axios from 'axios';
import { config } from '../config';

export const saveSubcriber = async (email: string): Promise<{ success: boolean; message: string }> => {
    try{
        const response = await axios.post(`${config.backendBaseUrl}/subscribe/save`,{ email });
        return response.data;
    }catch(err:any){
        throw err;
    }
};

export const getAllSubcribers = async () => {
    try{
        const token = localStorage.getItem('token');
    const response = await axios.get(`${config.backendBaseUrl}/subscribe/allsubscribers`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );
    return response.data;
    }catch(err:any){
        throw err;
    }
};
