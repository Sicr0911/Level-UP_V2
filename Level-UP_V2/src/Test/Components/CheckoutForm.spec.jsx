import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CheckoutForm from '../../Components/CheckoutForm';

describe('CheckoutForm - Interacción de Usuario', () => {

  const mockUser = {
    id: '1',
    nombre: 'GamerOne',
    email: 'gamer@test.com',
    fechaNacimiento: '1995-05-20',
    EsDuoc: false,
    EsMayorEdad: true,
    puntosLevelUp: 100,
    nivel: 2
  };

  const mockOnPlaceOrder = vi.fn();

  it('Debe renderizar los datos del usuario pre-cargados', () => {
    render(<CheckoutForm user={mockUser} subtotal={50000} onPlaceOrder={() => {}} />);

    expect(screen.getByLabelText(/Nombre:/i).value).toBe(mockUser.nombre);
    expect(screen.getByLabelText(/Correo:/i).value).toBe(mockUser.email);
    
    expect(screen.getByText(/\$50.000/)).toBeTruthy();
  });

  it('Debe permitir al usuario actualizar la dirección y la comuna', () => {
    render(<CheckoutForm user={mockUser} subtotal={50000} onPlaceOrder={() => {}} />);

    const inputCalle = screen.getByLabelText(/Calle:/i);
    const selectComuna = screen.getByLabelText(/Comuna:/i);

    fireEvent.change(inputCalle, { target: { value: 'Av. Siempreviva 742' } });
    fireEvent.change(selectComuna, { target: { value: 'Santiago' } });

    expect(inputCalle.value).toBe('Av. Siempreviva 742');
    expect(selectComuna.value).toBe('Santiago');
  });

  it('Debe llamar a onPlaceOrder con los datos completos al enviar el formulario', () => {
    render(<CheckoutForm user={mockUser} subtotal={20000} onPlaceOrder={mockOnPlaceOrder} />);

    const botonPagar = screen.getByRole('button', { name: /Pagar ahora/i });
    
    fireEvent.click(botonPagar);

    expect(mockOnPlaceOrder).toHaveBeenCalledTimes(1);
    
    expect(mockOnPlaceOrder).toHaveBeenCalledWith(expect.objectContaining({
        nombre: mockUser.nombre,
        email: mockUser.email,
        direccion: expect.objectContaining({
            comuna: 'Cerrillos' 
        })
    }));
  });
});