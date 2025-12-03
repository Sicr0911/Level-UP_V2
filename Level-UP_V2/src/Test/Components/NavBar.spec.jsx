import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../../Components/NavBar';

describe('NavBar - Navegación Principal', () => {

  const mockOnViewChange = vi.fn();

  it('Debe renderizar la marca y los enlaces principales', () => {
    render(<Navbar currentView="home" onViewChange={() => {}} cartItemCount={0} />);
    
    expect(screen.getByText('Level-Up Gamer')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Categorías')).toBeTruthy();
  });

  it('Debe mostrar la cantidad correcta de ítems en el carrito', () => {
    render(<Navbar currentView="home" onViewChange={() => {}} cartItemCount={5} />);
    expect(screen.getByText('🛒 Carrito (5)')).toBeTruthy();

    render(<Navbar currentView="home" onViewChange={() => {}} cartItemCount={0} />);
    expect(screen.getByText('🛒 Carrito (0)')).toBeTruthy();
  });

  it('Debe llamar a onViewChange con el argumento correcto al hacer clic', () => {
    render(<Navbar currentView="home" onViewChange={mockOnViewChange} cartItemCount={0} />);

    fireEvent.click(screen.getByText('Nosotros'));
    expect(mockOnViewChange).toHaveBeenCalledWith('nosotros');

    fireEvent.click(screen.getByText('👤 Perfil'));
    expect(mockOnViewChange).toHaveBeenCalledWith('perfil');
  });

  it('Debe resaltar el botón de la vista actual (Estilo Activo)', () => {
    render(<Navbar currentView="carrito" onViewChange={() => {}} cartItemCount={2} />);

    const btnCarrito = screen.getByRole('button', { name: /Carrito/i });
    
    expect(btnCarrito.style.backgroundColor).toBe('rgb(57, 255, 20)');
    expect(btnCarrito.style.color).toBe('rgb(0, 0, 0)');
  });

  it('No debe resaltar botones que no son la vista actual', () => {
    render(<Navbar currentView="home" onViewChange={() => {}} cartItemCount={2} />);

    const btnCarrito = screen.getByRole('button', { name: /Carrito/i });
    
    expect(btnCarrito.style.backgroundColor).toBe('transparent');
  });
});