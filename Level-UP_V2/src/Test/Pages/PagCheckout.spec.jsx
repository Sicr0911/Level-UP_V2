import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PagCheckout from '../../Pages/PagCheckout';

describe('PagCheckout - Flujo de Pago', () => {
  
  const mockUser = {
    id: '100',
    nombre: 'ProPlayer',
    email: 'pro@duoc.cl',
    fechaNacimiento: '2000-01-01',
    EsDuoc: true,
    EsMayorEdad: true,
    puntosLevelUp: 500,
    nivel: 10
  };

  const mockItems = [
    { 
      producto: { codigo: 'P1', nombre: 'Mouse Gamer', precio: 10000, categoria: 'Accesorios', descripcion: '', imagen: '' }, 
      cantidad: 2 
    }
  ];

  const mockOnSuccess = vi.fn();
  const mockOnFailure = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe calcular el subtotal correcto basado en los items', () => {
    render(<PagCheckout items={mockItems} user={mockUser} onPaymentSuccess={() => {}} onPaymentFailure={() => {}} />);
    
    expect(screen.getByText(/\$20.000/)).toBeTruthy();
  });

  it('Debe ejecutar onPaymentSuccess cuando el pago es aprobado (Random > 0.3)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    render(
      <PagCheckout 
        items={mockItems} 
        user={mockUser} 
        onPaymentSuccess={mockOnSuccess} 
        onPaymentFailure={mockOnFailure} 
      />
    );

    const botonPagar = screen.getByRole('button', { name: /Pagar ahora/i });
    fireEvent.click(botonPagar);

    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    expect(mockOnFailure).not.toHaveBeenCalled();
    
    expect(mockOnSuccess.mock.calls[0][0]).toMatch(/^ORD-/);
  });

  it('Debe ejecutar onPaymentFailure cuando el pago falla (Random <= 0.3)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    render(
      <PagCheckout 
        items={mockItems} 
        user={mockUser} 
        onPaymentSuccess={mockOnSuccess} 
        onPaymentFailure={mockOnFailure} 
      />
    );

    const botonPagar = screen.getByRole('button', { name: /Pagar ahora/i });
    fireEvent.click(botonPagar);

    expect(mockOnFailure).toHaveBeenCalledTimes(1);
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});