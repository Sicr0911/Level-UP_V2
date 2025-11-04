import React, { useState } from 'react';
import type { Usuario } from '../Interfaces/Usuario'; 

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const mainText = '#FFFFFF'; 
const headerFont = 'Orbitron, sans-serif';

const inputStyle: React.CSSProperties = {
  backgroundColor: '#333',
  border: `1px solid ${accentBlue}`,
  color: mainText,
  borderRadius: '4px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: neonGreen,
  color: primaryColor,
  fontWeight: 'bold',
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

  const formContainerStyle: React.CSSProperties = {
    backgroundColor: primaryColor,
    color: mainText,
    border: `2px solid ${accentBlue}`,
    fontFamily: 'Roboto, sans-serif'
  };

  return (
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-5"> 
                <div style={formContainerStyle} className="p-4 rounded-3">
                    <h2 style={{ color: accentBlue, fontFamily: headerFont, textAlign: 'center' }} className="mb-4">
                        Registro Level-Up | Únete a la Comunidad
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="nombre" className="form-label">Nombre de Usuario:</label>
                          <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={inputStyle}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email (Ej: usuario@duoc.cl):</label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                          <input
                            id="fechaNacimiento"
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            style={inputStyle}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="referido" className="form-label">Código de Referido (Opcional):</label>
                          <input
                            id="referido"
                            type="text"
                            value={codigoReferido}
                            onChange={(e) => setCodigoReferido(e.target.value)}
                            style={inputStyle}
                            className="form-control"
                          />
                        </div>
                        
                        {error && <p style={errorStyle}>{error}</p>}
                        {mensajeExito && <p style={{ color: neonGreen, marginTop: '15px' }}>{mensajeExito}</p>}

                        <button type="submit" style={buttonStyle} className="btn btn-lg w-100">
                          ¡Registrarse!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PagRegistro;