import axios from 'axios';
import { authHeader } from './AuthService';

const API_URL = "http://localhost:8080/api/products";

export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProductById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createProduct = async (product: any) => {
    const response = await axios.post(API_URL, product, { headers: authHeader() });
    return response.data;
};

export const updateProduct = async (id: number, product: any) => {
    const response = await axios.put(`${API_URL}/${id}`, product, { headers: authHeader() });
    return response.data;
};

export const deleteProduct = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};