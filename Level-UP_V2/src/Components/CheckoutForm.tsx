import React, { useState } from 'react';
import type { Usuario } from '../Interfaces/Usuario';
import type { Direccion } from '../Interfaces/Direccion';


interface CheckoutFormProps {
    user: Usuario;
    subtotal: number;
    onPlaceOrder: (userData: { nombre: string, email: string, direccion: Direccion }) => void;
}

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const mainText = '#FFFFFF'; 
const secondaryText = '#D3D3D3';
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
const totalStyle: React.CSSProperties = {
    backgroundColor: accentBlue,
    color: mainText,
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2em'
};

const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    });
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ user, subtotal, onPlaceOrder }) => {
    const [nombre, setNombre] = useState(user.nombre);
    const [apellidos, setApellidos] = useState('Hackson'); 
    const [email, setEmail] = useState(user.email);

    const [calle, setCalle] = useState('Los Crisantemos, Edificio Norte');
    const [departamento, setDepartamento] = useState('Depto 603');
    const [region, setRegion] = useState('Región Metropolitana de Santiago');
    const [comuna, setComuna] = useState('Cerrillos');
    const [indicaciones, setIndicaciones] = useState('Entre calles, color del edificio, no tiene timbre.');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const direccion: Direccion = {
            calle, 
            departamento, 
            region, 
            comuna, 
            indicaciones
        };

        const userData = {
            nombre,
            email,
            direccion
        };
        
        onPlaceOrder(userData);
    };

    return (
        <div className="p-4 rounded-3" style={{ border: `2px solid ${accentBlue}`, backgroundColor: primaryColor, color: mainText }}>
            
            <div className="d-flex justify-content-end mb-4">
                <div style={totalStyle}>
                    Total a pagar: {formatPrice(subtotal)}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <h3 className="fs-5 mb-3" style={{ color: neonGreen }}>Información del cliente</h3>
                <p className="text-muted" style={{fontSize: '0.9em'}}>
                    * Nota: Si el usuario ha iniciado sesión toda esta información se añadirá de forma automática.
                </p>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input type="text" id="nombre" className="form-control" style={inputStyle} value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                        <input type="text" id="apellidos" className="form-control" style={inputStyle} value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                    </div>
                    <div className="col-12">
                        <label htmlFor="correo" className="form-label">Correo:</label>
                        <input type="email" id="correo" className="form-control" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>

                <hr style={{ borderColor: secondaryText, margin: '30px 0' }} />

                <h3 className="fs-5 mb-3" style={{ color: neonGreen }}>Dirección de entrega de los productos</h3>
                <div className="row g-3">
                    <div className="col-md-8">
                        <label htmlFor="calle" className="form-label">Calle:</label>
                        <input type="text" id="calle" className="form-control" style={inputStyle} value={calle} onChange={(e) => setCalle(e.target.value)} required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="departamento" className="form-label">Departamento (opcional):</label>
                        <input type="text" id="departamento" className="form-control" style={inputStyle} value={departamento} onChange={(e) => setDepartamento(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="region" className="form-label">Región:</label>
                        <select id="region" className="form-select" style={inputStyle} value={region} onChange={(e) => setRegion(e.target.value)} required>
                            <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                            <option value="Otras">Otras Regiones...</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="comuna" className="form-label">Comuna:</label>
                        <select id="comuna" className="form-select" style={inputStyle} value={comuna} onChange={(e) => setComuna(e.target.value)} required>
                            <option value="Cerrillos">Cerrillos</option>
                            <option value="Santiago">Santiago</option>
                            <option value="Maipu">Maipú</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="indicaciones" className="form-label">Indicaciones para la entrega (opcional):</label>
                        <textarea id="indicaciones" className="form-control" style={inputStyle} value={indicaciones} onChange={(e) => setIndicaciones(e.target.value)} rows={2} />
                    </div>
                </div>

                <div className="mt-4">
                    <button type="submit" style={buttonStyle} className="btn btn-lg w-100">
                        Pagar ahora {formatPrice(subtotal)}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;