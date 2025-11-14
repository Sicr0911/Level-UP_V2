import React, { useState } from 'react';
import type { Usuario } from '../Interfaces/Usuario'; 

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const mainText = '#FFFFFF'; 
const secondaryText = '#D3D3D3';
const headerFont = 'Orbitron, sans-serif';

const inputStyle: React.CSSProperties = {
  backgroundColor: '#333',
  border: `1px solid ${secondaryText}`,
  color: mainText,
  borderRadius: '4px'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: accentBlue,
  color: mainText,
  fontWeight: 'bold',
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

  const profileContainerStyle: React.CSSProperties = {
    backgroundColor: primaryColor,
    color: mainText,
    border: `2px solid ${accentBlue}`,
    fontFamily: 'Roboto, sans-serif',
  };

  return (
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-12 col-lg-8"> 
                <div style={profileContainerStyle} className="p-4 rounded-3">
                    <h2 style={{ color: accentBlue, fontFamily: headerFont, textAlign: 'center' }} className="mb-4">
                        Mi Perfil Level-Up
                    </h2>
                    
                    <div className="mb-4 pb-3 border-bottom" style={{ borderColor: secondaryText }}>
                        <p style={{ color: secondaryText }}>Código de Usuario: {user.id}</p>
                        <div className="d-flex align-items-center">
                            <h3 className="fs-5 me-2 mb-0">Estado de Descuento:</h3>
                            {user.EsDuoc ? (
                                <span style={duocBadgeStyle}>✅ 20% Descuento Duoc Activo</span>
                            ) : (
                                <span style={{...duocBadgeStyle, backgroundColor: '#FF5733'}}>❌ Sin Descuento Duoc</span>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h3 className="fs-5 mb-3">Actualizar Información Personal</h3>
                        
                        <div className="mb-3">
                          <label htmlFor="nombre" className="form-label">Nombre:</label>
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
                          <label htmlFor="email" className="form-label">Email:</label>
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

                        <div className="text-muted mt-3 mb-4" style={{fontSize: '0.9em'}}>
                            * La fecha de nacimiento ({user.fechaNacimiento}) solo se puede cambiar en el registro inicial.
                        </div>
                        
                        <button type="submit" style={buttonStyle} className="btn w-100">
                          Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PagPerfil;