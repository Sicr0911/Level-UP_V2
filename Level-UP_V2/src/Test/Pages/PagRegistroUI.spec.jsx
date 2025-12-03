import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PagRegistro from '../../Pages/PagRegistro';
import * as Validations from '../../Utils/validations'; 

describe('PagRegistro - Interfaz de Usuario', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe mostrar un error visual si la validación falla (Menor de edad)', () => {
    vi.spyOn(Validations, 'validateRegistration').mockReturnValue({
      EsMayorEdad: false,
      EsDuoc: false,
      error: '❌ Debes ser mayor de 18 años'
    });

    render(<PagRegistro />);

    fireEvent.change(screen.getByLabelText(/Nombre de Usuario:/i), { target: { value: 'KidGamer' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'kid@game.com' } });
    fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento:/i), { target: { value: '2015-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /¡Registrarse!/i }));

    expect(screen.getByText('❌ Debes ser mayor de 18 años')).toBeTruthy();
    
    expect(screen.queryByText(/¡Registro exitoso!/i)).toBeNull();
  });

  it('Debe mostrar mensaje de éxito y limpiar campos si el registro es correcto', () => {
    vi.spyOn(Validations, 'validateRegistration').mockReturnValue({
      EsMayorEdad: true,
      EsDuoc: false,
      error: ''
    });

    render(<PagRegistro />);

    const inputNombre = screen.getByLabelText(/Nombre de Usuario:/i);
    const inputEmail = screen.getByLabelText(/Email/i);
    
    fireEvent.change(inputNombre, { target: { value: 'AdultGamer' } });
    fireEvent.change(inputEmail, { target: { value: 'adult@game.com' } });
    fireEvent.click(screen.getByRole('button', { name: /¡Registrarse!/i }));

    expect(screen.getByText(/¡Registro exitoso!/i)).toBeTruthy();

    expect(inputNombre.value).toBe('');
    expect(inputEmail.value).toBe('');
  });

  it('Debe detectar y mencionar el descuento Duoc si el email es institucional', () => {
    vi.spyOn(Validations, 'validateRegistration').mockReturnValue({
      EsMayorEdad: true,
      EsDuoc: true, 
      error: ''
    });

    render(<PagRegistro />);
    
    fireEvent.click(screen.getByRole('button', { name: /¡Registrarse!/i }));

    expect(screen.getByText(/descuento del 20%/i)).toBeTruthy();
  });
});