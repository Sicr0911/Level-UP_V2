import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAllProducts } from '../../services/ProductoAPIService';

global.fetch = vi.fn();

describe('ProductoAPIService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('Debe traer productos y mapearlos correctamente (id -> codigo)', async () => {
        const mockBackendResponse = [
            { id: 1, name: 'PS5', categoria: 'Consolas', precio: 500000, descripcion: 'Desc', imagen: '/img.png' }
        ];

        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockBackendResponse,
        });

        const productos = await fetchAllProducts();

        expect(productos).toHaveLength(1);
        expect(productos[0].codigo).toBe('1');
        expect(productos[0].nombre).toBe('PS5');
    });

    it('Debe manejar errores de conexión retornando array vacío', async () => {
        (global.fetch as any).mockRejectedValue(new Error('Fallo de red'));

        const productos = await fetchAllProducts();
        expect(productos).toEqual([]);
    });
});