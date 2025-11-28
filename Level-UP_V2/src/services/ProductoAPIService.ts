import type { Producto } from '../Interfaces/Producto';

const PRODUCT_API_URL = 'http://localhost:8080/api/v1/products';

export const fetchAllProducts = async (): Promise<Producto[]> => {
    console.log("Intentando conectar con el backend en:", PRODUCT_API_URL);
    try {
        const response = await fetch(PRODUCT_API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("❌ Error de conexión o al obtener datos del backend:", error);

        return []; 
    }
};

