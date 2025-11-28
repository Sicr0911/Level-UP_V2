export const validateRegistration = (fechaNacimiento: string, email: string) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  if (!fechaNacimiento || isNaN(nacimiento.getTime())) {
    return { EsMayorEdad: false, EsDuoc: false, error: 'Por favor ingresa una fecha válida.' };
  }

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  const dia = hoy.getDate() - nacimiento.getDate();

  if (mes < 0 || (mes === 0 && dia < 0)) {
    edad--;
  }

  const EsMayorEdad = edad >= 18;
  
  const emailLower = email.toLowerCase().trim();
  const EsDuoc = emailLower.endsWith('@duoc.cl') || emailLower.endsWith('@alumnos.duoc.cl');
  
  let error = '';
  if (!EsMayorEdad) {
    error = '❌ Debes ser mayor de 18 años para registrarte en Level-Up Gamer.';
  }

  return { EsMayorEdad, EsDuoc, error };
};