import axios from 'axios';

const API_URL = "http://localhost:8080/api";

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error("Error en login", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("carrito");
    window.location.href = "/login";
};

export const register = async (userData: any) => {
    return await axios.post(`${API_URL}/users/register`, userData);
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const authHeader = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};