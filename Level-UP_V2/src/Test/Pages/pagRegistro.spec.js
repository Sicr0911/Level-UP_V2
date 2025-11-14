describe('Validación de Registro - Level-Up Gamer', function() {

  it('Debe rechazar el registro si el usuario es menor de 18 años', function() {
    const hoy = new Date();
    const fechaMenorEdad = new Date(hoy.getFullYear() - 17, hoy.getMonth(), hoy.getDate() + 1).toISOString().split('T')[0];

    const { EsMayorEdad, error } = validateRegistration(fechaMenorEdad, 'test@mail.cl');

    expect(EsMayorEdad).toBe(false);
    expect(error).toContain('Debes ser mayor de 18 años'); // 
  });

  it('Debe aplicar el descuento del 20% si el email es de Duoc', function() {
    const emailDuoc = 'gamer_elite@alumnos.duoc.cl';

    const { EsDuoc } = validateRegistration('1990-01-01', emailDuoc); 

    expect(EsDuoc).toBe(true);
  });

  it('No debe aplicar descuento si el email no es de Duoc', function() {
    const emailGenerico = 'gamer_pro@gmail.com';

    // ACT
    const { EsDuoc } = validateRegistration('1990-01-01', emailGenerico); 

    // ASSERT
    expect(EsDuoc).toBe(false);
  });
});