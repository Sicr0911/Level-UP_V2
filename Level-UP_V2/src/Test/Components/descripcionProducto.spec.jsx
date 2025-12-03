import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../../Components/ProductoDesc'; 

describe('descripcionProducto - Interacción y DOM', function() {

  const testProducto = {
    codigo: 'TEST01',
    nombre: 'Controlador de Prueba',
    categoria: 'Accesorios',
    precio: 59990,
    descripcion: 'Un controlador para pruebas unitarias.',
    imagen: 'img.png'
  };

  it('Debe llamar a onAddToCart con el producto correcto al hacer clic', function() {
    const mockOnAddToCart = vi.fn();

    render(
      <ProductCard producto={testProducto} onAddToCart={mockOnAddToCart} />
    );

    const boton = screen.getByText('Añadir al Carrito'); 
    fireEvent.click(boton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(testProducto);
  });

  it('Debe mostrar el nombre y el precio formateado correctamente en el DOM', function() {
    render(
      <ProductCard producto={testProducto} onAddToCart={() => {}} />
    );

    expect(screen.getByText('Controlador de Prueba')).toBeTruthy(); 
    expect(screen.getByText(/\$59\.990/)).toBeTruthy();
    expect(screen.getByText('Categoría: Accesorios')).toBeTruthy(); 
  });
});