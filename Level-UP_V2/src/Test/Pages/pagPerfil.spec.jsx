import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PagPerfil from '../../Pages/PagPerfil';

describe('PagPerfil - Visualización y Gestión de Usuario', () => {
  
  const userDuocPro = {
    id: 'user_gamified',
    nombre: 'MasterGamer',
    email: 'master@duoc.cl',
    fechaNacimiento: '1990-01-01',
    EsDuoc: true,
    EsMayorEdad: true,
    puntosLevelUp: 2500,
    nivel: 5,
  };
  
  const userRegular = { ...userDuocPro, EsDuoc: false, email: 'regular@mail.cl', nombre: 'Juanito', puntosLevelUp: 0, nivel: 1 };
  
  it('Debe mostrar los puntos LevelUp con el color de acento Verde Neón', () => {
    const { getByText } = render(<PagPerfil user={userDuocPro} onUpdate={() => {}} />);
    
    const puntosElement = getByText('2500');
    expect(puntosElement.style.color).toBe('rgb(57, 255, 20)'); 
  });

  it('Debe llamar a onUpdate con el nuevo nombre al guardar cambios', () => {
    const mockOnUpdate = vi.fn();
    const { getByLabelText, getByText } = render(<PagPerfil user={userRegular} onUpdate={mockOnUpdate} />);
    
    const nombreInput = getByLabelText('Nombre:');
    fireEvent.change(nombreInput, { target: { value: 'LevelUpMaster' } });
    
    fireEvent.click(getByText('Guardar Cambios'));
    
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'LevelUpMaster',
      email: userRegular.email,
    }));
  });
});