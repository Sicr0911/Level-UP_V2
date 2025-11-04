import React, { useState } from 'react';
import type { Usuario } from '../Interfaces/Usuario'; 

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const mainText = '#FFFFFF'; 
const fontFamily = 'Roboto, sans-serif'; 
const headerFont = 'Orbitron, sans-serif';
const containerStyle: React.CSSProperties = {
  backgroundColor: primaryColor,
  color: mainText,
  padding: '40px',
  margin: '40px auto',
  maxWidth: '450px',
  borderRadius: '10px',
  border: `2px solid ${accentBlue}`,
  fontFamily: fontFamily
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  boxSizing: 'border-box',
  backgroundColor: '#333',
  border: `1px solid ${accentBlue}`,
  color: mainText,
  borderRadius: '4px'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: neonGreen,
  color: primaryColor,
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
  fontWeight: 'bold',
  width: '100%'
};

const errorStyle: React.CSSProperties = {
    color: 'red',
    fontSize: '0.9em'
}


const PagRegistro: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [codigoReferido, setCodigoReferido] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const dia = hoy.getDate() - nacimiento.getDate();
    const EsMayorEdad = edad > 18 || (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)));

    if (!EsMayorEdad) {
      setError('❌ Debes ser mayor de 18 años para registrarte en Level-Up Gamer.');
      return;
    }

    const EsDuoc = email.endsWith('@duoc.cl') || email.endsWith('@alumnos.duoc.cl');
    
    let puntosIniciales = 0;
    if (codigoReferido) {
        puntosIniciales = 100;
        console.log(`Referido detectado: Se otorgarán puntos al referente.`);
    }

    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre,
      email,
      fechaNacimiento,
      EsDuoc,
      EsMayorEdad: true,
      puntosLevelUp: puntosIniciales, 
      nivel: 1,
    };

    console.log('Usuario Registrado:', nuevoUsuario);
    
    let mensaje = '✅ ¡Registro exitoso! Prepárate para subir de nivel.';
    if (EsDuoc) {
        mensaje += ' ¡Felicidades! Tienes un descuento del 20% de por vida por ser de Duoc.';
    }
    if (puntosIniciales > 0) {
        mensaje += ` Además, ¡ganaste ${puntosIniciales} Puntos LevelUp por tu referido!`;
    }
    setMensajeExito(mensaje);
    
    setNombre('');
    setEmail('');
    setFechaNacimiento('');
    setCodigoReferido('');
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: accentBlue, fontFamily: headerFont, textAlign: 'center' }}>
        Registro Level-Up | Únete a la Comunidad
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre de Usuario:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email (Ej: usuario@duoc.cl):</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            id="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        
        <div>
          <label htmlFor="referido">Código de Referido (Opcional):</label>
          <input
            id="referido"
            type="text"
            value={codigoReferido}
            onChange={(e) => setCodigoReferido(e.target.value)}
            style={inputStyle}
          />
        </div>
        
        {error && <p style={errorStyle}>{error}</p>}
        {mensajeExito && <p style={{ color: neonGreen, marginTop: '15px' }}>{mensajeExito}</p>}

        <button type="submit" style={buttonStyle}>
          ¡Registrarse!
        </button>
      </form>
    </div>
  );
};

export default PagRegistro;