import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PagCarrito from '../../Pages/PagCarrito';

describe('PagCarrito - Lógica de Visualización y Cálculo', function() {
  
  const productoCatan = { code: 'JM001', name: 'Catan', priceCLP: 29990, category: 'Juegos de Mesa', precio: 29990, nombre: 'Catan' }; // Ajustamos props para coincidir con tu interfaz Producto
  const productoCarcassonne = { code: 'JM002', name: 'Carcassonne', priceCLP: 24990, category: 'Juegos de Mesa', precio: 24990, nombre: 'Carcassonne' };
  
  const itemsMultiples = [
    { producto: productoCatan, cantidad: 1 },
    { producto: productoCarcassonne, cantidad: 1 }
  ];

  it('Debe mostrar el mensaje de carrito vacío si no hay ítems', function() {
    render(<PagCarrito items={[]} />);

    expect(screen.getByText('Tu carrito está vacío. ¡Es hora de subir de nivel tus compras!')).toBeTruthy();
    expect(screen.queryByText('Finalizar Compra')).toBeNull();
  });

  it('Debe calcular el total de la compra para diferentes ítems', function() {
    render(<PagCarrito items={itemsMultiples} />);
    
    expect(screen.getByText('$54.980 CLP')).toBeTruthy();
  });

  it('Debe multiplicar el precio por la cantidad de un mismo producto', function() {
    const itemsCatanDoble = [{ producto: productoCatan, cantidad: 2 }];
    
    render(<PagCarrito items={itemsCatanDoble} />);
    
    expect(screen.getByText('$59.980 CLP')).toBeTruthy();
    expect(screen.getByText('Cantidad: x2')).toBeTruthy();
  });
  
  it('Debe mostrar el Total a Pagar con el símbolo y formato CLP', function() {
    render(<PagCarrito items={itemsMultiples} />);
    const totalElement = screen.getByText(/Total a Pagar/i);
    expect(totalElement).toBeTruthy();
  });
  
  it('Debe verificar que el botón Finalizar Compra tenga el color Verde Neón', function() {
    render(<PagCarrito items={itemsMultiples} />);
    const checkoutButton = screen.getByText('Finalizar Compra');

    // RGB de #39FF14
    expect(checkoutButton.style.backgroundColor).toBe('rgb(57, 255, 20)');
  });
});