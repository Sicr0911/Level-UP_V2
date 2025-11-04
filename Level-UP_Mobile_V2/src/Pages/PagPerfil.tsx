import React, { useState } from 'react';
import type { Usuario } from '../Interfaces/Usuario';

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF';
const secondaryText = '#D3D3D3';
const headerFont = 'Orbitron, sans-serif';

const containerStyle: React.CSSProperties = {
  backgroundColor: primaryColor,
  color: mainText,
  padding: '40px',
  margin: '40px auto',
  maxWidth: '600px',
  borderRadius: '10px',
  border: `2px solid ${accentBlue}`,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  boxSizing: 'border-box',
  backgroundColor: '#333',
  border: `1px solid ${secondaryText}`,
  color: mainText,
  borderRadius: '4px'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: accentBlue,
  color: mainText,
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
  fontWeight: 'bold',
  width: '100%'
};

const duocBadgeStyle: React.CSSProperties = {
    backgroundColor: neonGreen,
    color: primaryColor,
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '5px',
    marginLeft: '10px',
    fontSize: '0.9em'
}

interface PagPerfilProps {
    user: Usuario;
    onUpdate: (updatedUser: Usuario) => void;
}

const PagPerfil: React.FC<PagPerfilProps> = ({ user, onUpdate }) => {
  const [nombre, setNombre] = useState(user.nombre);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const EsDuoc = email.endsWith('@duoc.cl') || email.endsWith('@alumnos.duoc.cl');
    
    const updatedUser: Usuario = {
        ...user,
        nombre,
        email,
        EsDuoc: EsDuoc
    };

    onUpdate(updatedUser);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: accentBlue, fontFamily: headerFont, textAlign: 'center' }}>
        Mi Perfil Level-Up
      </h2>
      
      <div style={{ marginBottom: '30px', borderBottom: `1px solid ${secondaryText}`, paddingBottom: '15px' }}>
          <p style={{ color: secondaryText }}>Código de Usuario: {user.id}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Estado de Descuento:</h3>
            {user.EsDuoc ? (
                <span style={duocBadgeStyle}>✅ 20% Descuento Duoc Activo</span>
            ) : (
                <span style={{...duocBadgeStyle, backgroundColor: '#FF5733'}}>❌ Sin Descuento Duoc</span>
            )}
          </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Actualizar Información Personal</h3>
        <div>
          <label htmlFor="nombre">Nombre:</label>
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
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={{color: secondaryText, marginTop: '10px'}}>
            * La fecha de nacimiento ({user.fechaNacimiento}) solo se puede cambiar en el registro inicial.
        </div>
        
        <button type="submit" style={buttonStyle}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default PagPerfil;