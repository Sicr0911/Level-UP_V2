import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AlertMessage from '../../Components/AlertMessage';

describe('AlertMessage - Feedback Visual', () => {

  it('Debe renderizar el mensaje de éxito con el icono y color correctos', () => {
    render(<AlertMessage type="success" message="Operación exitosa" />);
    
    const alertNode = screen.getByRole('alert');
    const textNode = screen.getByText('Operación exitosa');
    const iconNode = screen.getByText('✅');

    expect(textNode).toBeTruthy();
    expect(iconNode).toBeTruthy();
    
    expect(alertNode.style.backgroundColor).toBe('rgb(57, 255, 20)');
  });

  it('Debe renderizar el mensaje de error con el icono y color correctos', () => {
    render(<AlertMessage type="error" message="Algo salió mal" />);
    
    const alertNode = screen.getByRole('alert');
    
    expect(screen.getByText('Algo salió mal')).toBeTruthy();
    expect(screen.getByText('❌')).toBeTruthy();
    
    expect(alertNode.style.borderColor).toBe('rgb(255, 87, 51)'); 
  });
});