import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PagAdminProductosCRUD from '../../../Pages/Admin/AdminProductosCRUD';
import * as ProductosData from '../../../Data/Productos'; 

describe('AdminProductosCRUD - Gestión de Inventario', () => {

  const mockNavigate = vi.fn();

  const mockProductsList = [
    { codigo: 'P001', nombre: 'Juego 1', categoria: 'Juegos de Mesa', precio: 1000, descripcion: 'Desc 1', imagen: '' }
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(ProductosData, 'getAllProducts').mockReturnValue(mockProductsList);
  });

  it('Modo CREAR: Debe renderizar el formulario vacío', () => {
    render(<PagAdminProductosCRUD type="nuevo" onNavigate={mockNavigate} />);

    expect(screen.getByText('✨ Nuevo Producto')).toBeTruthy();
    expect(screen.getByLabelText(/Nombre:/i).value).toBe('');
    expect(screen.getByText('Crear Producto')).toBeTruthy();
  });

  it('Modo CREAR: Debe llamar a createProduct con los datos ingresados', () => {
    const createSpy = vi.spyOn(ProductosData, 'createProduct');
    render(<PagAdminProductosCRUD type="nuevo" onNavigate={mockNavigate} />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Nuevo Mouse' } });
    fireEvent.change(screen.getByLabelText(/Precio/i), { target: { value: '15000' } });
    fireEvent.change(screen.getByLabelText(/Descripción:/i), { target: { value: 'Mouse RGB' } });

    fireEvent.click(screen.getByText('Crear Producto'));

    expect(createSpy).toHaveBeenCalledTimes(1);
    
    expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'Nuevo Mouse',
      precio: 15000,
      descripcion: 'Mouse RGB',
      codigo: expect.stringMatching(/^P\d+/)
    }));
    
    expect(screen.getByText(/CREADO con éxito/i)).toBeTruthy();
  });

  it('Modo EDITAR: Debe cargar los datos del producto existente', () => {
    const productoExistente = mockProductsList[0];
    vi.spyOn(ProductosData, 'getProductByCode').mockReturnValue(productoExistente);

    render(<PagAdminProductosCRUD type="editar" code="P001" onNavigate={mockNavigate} />);

    expect(screen.getByText('⚙️ Editar Producto')).toBeTruthy();
    expect(screen.getByLabelText(/Nombre:/i).value).toBe('Juego 1');
    expect(screen.getByText('Guardar Cambios (Actualizar)')).toBeTruthy();
  });

  it('Modo EDITAR: Debe llamar a updateProduct al guardar cambios', () => {
    const productoExistente = mockProductsList[0];
    vi.spyOn(ProductosData, 'getProductByCode').mockReturnValue(productoExistente);
    const updateSpy = vi.spyOn(ProductosData, 'updateProduct').mockReturnValue(productoExistente);

    render(<PagAdminProductosCRUD type="editar" code="P001" onNavigate={mockNavigate} />);

    fireEvent.change(screen.getByLabelText(/Precio/i), { target: { value: '2000' } });
    fireEvent.click(screen.getByText('Guardar Cambios (Actualizar)'));

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({
      codigo: 'P001',
      precio: 2000
    }));

    expect(screen.getByText(/ACTUALIZADO con éxito/i)).toBeTruthy();
  });

  it('Modo EDITAR: Debe mostrar error si el producto no existe', () => {
    vi.spyOn(ProductosData, 'getProductByCode').mockReturnValue(undefined);

    render(<PagAdminProductosCRUD type="editar" code="P_INVALIDO" onNavigate={mockNavigate} />);

    expect(screen.getByText(/Producto con código P_INVALIDO no encontrado/i)).toBeTruthy();
  });
});