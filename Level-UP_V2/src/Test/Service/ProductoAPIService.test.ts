import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { fetchAllProducts } from '../../services/ProductoAPIService';

global.fetch = vi.fn() as unknown as typeof fetch;

describe('ProductoAPIService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('Debe traer productos y mapearlos correctamente (id -> codigo)', async () => {
        const mockBackendResponse = [
            { 
                id: 1, 
                title: 'PS5',
                name: 'PS5',
                category: 'Consolas', 
                price: 500,
                precio: 500000,
                description: 'Desc', 
                image: '/img.png',
                imagen: '/img.png'
            }
        ];

        (global.fetch as Mock).mockResolvedValue({
            ok: true,
            json: async () => mockBackendResponse,
        });

        const productos = await fetchAllProducts();

        // 4. Validaciones
        expect(productos).toHaveLength(1);
        
        expect(productos[0].codigo).toBe('1'); 
        
        expect(productos[0].nombre).toBe('PS5');
    });

    it('Debe manejar errores de conexión retornando array vacío', async () => {
        (global.fetch as Mock).mockRejectedValue(new Error('Fallo de red'));

        const productos = await fetchAllProducts();
        expect(productos).toEqual([]);
    });
});