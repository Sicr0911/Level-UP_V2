import type { Producto } from '../Interfaces/Producto';
interface BackendProduct {
    id: number;
    name: string;
    precio: number;
    descripcion: string;
    imagen: string;
    categoria: string;
    stock: number;
}

const PRODUCT_API_URL = 'http://localhost:8080/api/v1/products';

export const fetchAllProducts = async (): Promise<Producto[]> => {
    console.log("📡 Conectando a:", PRODUCT_API_URL);
    try {
        const response = await fetch(PRODUCT_API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: BackendProduct[] = await response.json();
        
        return data.map((item) => ({
            id: item.id,
            name: item.name,
            precio: item.precio,
            descripcion: item.descripcion,
            imagen: item.imagen || '/img/default.png', 
            categoria: item.categoria,
            stock: item.stock
        }));

    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        return []; 
    }
};