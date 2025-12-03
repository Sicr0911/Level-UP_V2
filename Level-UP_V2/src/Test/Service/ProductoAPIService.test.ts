import type { Producto } from '../../Interfaces/Producto';

interface ApiProducto {
    id: number | string;
    title?: string;
    name?: string;
    price?: number;
    precio?: number;
    description?: string;
    image?: string;
    imagen?: string;
    category?: string;
}

const PRODUCT_API_URL = 'http://localhost:8080/api/v1/products';

export const fetchAllProducts = async (): Promise<Producto[]> => {
    console.log("Intentando conectar con el backend en:", PRODUCT_API_URL);
    try {
        const response = await fetch(PRODUCT_API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const data: ApiProducto[] = await response.json();

        return data.map((item) => ({
            codigo: item.id.toString(),
            nombre: item.title || item.name || 'Nombre no disponible',
            precio: item.price || item.precio || 0,
            descripcion: item.description || '',
            imagen: item.image || item.imagen || 'default.jpg',
            categoria: item.category || 'General'
        }));

    } catch (error) {
        console.error("❌ Error de conexión o al obtener datos del backend:", error);
        
        return []; 
    }
};