import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PagCatalogo from '../../Pages/PagCatalogo';
import * as APIService from '../../services/ProductoAPIService';

describe('PagCatalogo - Gestión de Productos y Filtros', () => {

  const mockProductos = [
    { codigo: '1', nombre: 'Elden Ring', categoria: 'Videojuegos', precio: 45000, descripcion: 'RPG de acción', imagen: '' },
    { codigo: '2', nombre: 'Teclado Mecánico', categoria: 'Accesorios', precio: 30000, descripcion: 'Teclado RGB', imagen: '' },
    { codigo: '3', nombre: 'Silla Gamer', categoria: 'Mobiliario', precio: 150000, descripcion: 'Silla ergonómica', imagen: '' }
  ];

  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe mostrar el estado de carga inicialmente', () => {
    vi.spyOn(APIService, 'fetchAllProducts').mockImplementation(() => new Promise(() => {}));
    
    render(<PagCatalogo onAddToCart={mockOnAddToCart} />);
    
    expect(screen.getByText(/Cargando datos del Backend/i)).toBeTruthy();
  });

  it('Debe cargar y mostrar los productos correctamente', async () => {
    vi.spyOn(APIService, 'fetchAllProducts').mockResolvedValue(mockProductos);
    
    render(<PagCatalogo onAddToCart={mockOnAddToCart} />);

    await waitFor(() => {
        expect(screen.getByText('Elden Ring')).toBeTruthy();
        expect(screen.getByText('Teclado Mecánico')).toBeTruthy();
        expect(screen.getByText('Silla Gamer')).toBeTruthy();
    });
  });

  it('Debe filtrar productos por Barra de Búsqueda (Nombre)', async () => {
    vi.spyOn(APIService, 'fetchAllProducts').mockResolvedValue(mockProductos);
    render(<PagCatalogo onAddToCart={mockOnAddToCart} />);

    await waitFor(() => screen.getByText('Elden Ring'));

    const searchInput = screen.getByPlaceholderText(/Buscar por nombre/i);
    
    fireEvent.change(searchInput, { target: { value: 'Teclado' } });

    expect(screen.getByText('Teclado Mecánico')).toBeTruthy();
    
    expect(screen.queryByText('Elden Ring')).toBeNull();
  });

  it('Debe filtrar productos por Categoría (Select)', async () => {
    vi.spyOn(APIService, 'fetchAllProducts').mockResolvedValue(mockProductos);
    render(<PagCatalogo onAddToCart={mockOnAddToCart} />);
    await waitFor(() => screen.getByText('Elden Ring'));

    const selectCategoria = screen.getByRole('combobox'); 
    
    fireEvent.change(selectCategoria, { target: { value: 'Videojuegos' } });

    expect(screen.getByText('Elden Ring')).toBeTruthy();
    expect(screen.queryByText('Silla Gamer')).toBeNull();
  });

  it('Debe mostrar mensaje si no se encuentran coincidencias', async () => {
    vi.spyOn(APIService, 'fetchAllProducts').mockResolvedValue(mockProductos);
    render(<PagCatalogo onAddToCart={mockOnAddToCart} />);
    await waitFor(() => screen.getByText('Elden Ring'));

    const searchInput = screen.getByPlaceholderText(/Buscar por nombre/i);
    fireEvent.change(searchInput, { target: { value: 'Producto Inexistente XYZ' } });

    expect(screen.getByText(/No se encontraron productos que coincidan/i)).toBeTruthy();
  });
});