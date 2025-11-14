describe('PagPerfil - Visualización y Gestión de Usuario', function() {
  
  const userDuocPro = {
    id: 'user_gamified',
    nombre: 'MasterGamer',
    email: 'master@duoc.cl',
    fechaNacimiento: '1990-01-01',
    isDuoc: true,
    isMayorEdad: true,
    puntosLevelUp: 2500,
    nivel: 5,
  };
  
  const userRegular = { ...userDuocPro, isDuoc: false, email: 'regular@mail.cl', nombre: 'Juanito', puntosLevelUp: 0, nivel: 1 };
  
  it('Debe mostrar los puntos LevelUp con el color de acento Verde Neón', function() {
    const { getByText } = render(<PagPerfil user={userDuocPro} onUpdate={() => {}} />);
    
    const puntosElement = getByText('2500').closest('p');
    
    expect(puntosElement.querySelector('span').style.color).toBe('rgb(57, 255, 20)'); 
    expect(getByText('2500')).toBeTruthy();
  });

  it('Debe mostrar el nivel actual del usuario', function() {
    const { getByText } = render(<PagPerfil user={userDuocPro} onUpdate={() => {}} />);
    expect(getByText('Nivel Actual:').closest('p').textContent).toContain('5');
  });
  
  it('Debe mostrar el badge de Descuento Duoc Activo', function() {
    const { getByText } = render(<PagPerfil user={userDuocPro} onUpdate={() => {}} />);
    expect(getByText('20% Descuento Duoc Activo')).toBeTruthy();
  });

  it('Debe mostrar la etiqueta de Sin Descuento Duoc para usuarios genéricos', function() {
    const { getByText } = render(<PagPerfil user={userRegular} onUpdate={() => {}} />);
    expect(getByText('❌ Sin Descuento Duoc')).toBeTruthy();
  });

  it('Debe llamar a onUpdate con el nuevo nombre al guardar cambios', function() {
    const mockOnUpdate = jasmine.createSpy('onUpdateSpy');
    const { getByLabelText, getByText, fireEvent } = render(<PagPerfil user={userRegular} onUpdate={mockOnUpdate} />);
    
    const nombreInput = getByLabelText('Nombre:')
    fireEvent.change(nombreInput, { target: { value: 'LevelUpMaster' } });
    
    fireEvent.click(getByText('Guardar Cambios'));
    
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(jasmine.objectContaining({
      nombre: 'LevelUpMaster',
      email: userRegular.email,
    }));
  });

  it('Debe verificar la fuente del título y el color de fondo del botón', function() {
    const { getByText } = render(<PagPerfil user={userRegular} onUpdate={() => {}} />);
    
    const titulo = getByText('Mi Perfil Level-Up');
    const botonGuardar = getByText('Guardar Cambios');

    expect(titulo.style.fontFamily).toContain('Orbitron');
    expect(botonGuardar.style.backgroundColor).toBe('rgb(30, 144, 255)');
  });
});