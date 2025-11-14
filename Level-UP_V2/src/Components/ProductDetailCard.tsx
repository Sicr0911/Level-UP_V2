import React, { useState } from 'react';
import type { Producto } from '../Interfaces/Producto'; 

interface ProductDetailProps {
  producto: Producto;
  onAddToCart: (producto: Producto, cantidad: number) => void;
}

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF';
const secondaryText = '#D3D3D3'; 
const headerFont = 'Orbitron, sans-serif';

const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    });
};

const ProductDetailCard: React.FC<ProductDetailProps> = ({ producto, onAddToCart }) => {
    const [cantidad, setCantidad] = useState(1);

    const handleAdd = () => {
        onAddToCart(producto, cantidad);
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: primaryColor,
        border: `3px solid ${accentBlue}`,
        color: mainText,
        borderRadius: '10px',
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: neonGreen,
        color: primaryColor,
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
        border: 'none',
    };
    
    const getRating = () => {
        const stars = Math.floor(Math.random() * 2) + 4;
        return '⭐'.repeat(stars);
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div style={cardStyle} className="p-4 shadow">
                        <h2 
                            style={{ fontFamily: headerFont, color: neonGreen }} 
                            className="mb-4 border-bottom pb-2"
                        >
                            {producto.nombre}
                        </h2>

                        <div className="row">
                            <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
                                <img 
                                    src={producto.imagen} 
                                    alt={producto.nombre} 
                                    className="img-fluid" 
                                    style={{ maxHeight: '400px', objectFit: 'contain', border: `1px solid ${secondaryText}` }}
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <p className="fs-4" style={{ color: accentBlue, fontFamily: headerFont }}>
                                    {formatPrice(producto.precio)}
                                </p>
                                
                                <p style={{ color: neonGreen, fontSize: '1.2em' }}>
                                    Calificación: {getRating()}
                                </p>

                                <h5 style={{ color: mainText, marginTop: '20px' }}>Descripción Completa</h5>
                                <p style={{ color: secondaryText, fontSize: '0.95em' }}>
                                    {producto.descripcion}
                                </p>
                                
                                <p style={{ color: secondaryText }}>
                                    Categoría: <span className="fw-bold" style={{ color: accentBlue }}>{producto.categoria}</span>
                                </p>
                                
                                <hr style={{ borderColor: secondaryText }}/>

                                <div className="d-flex align-items-center mt-4">
                                    <label htmlFor="cantidad" className="form-label me-3 mb-0 fw-bold">Cantidad:</label>
                                    <input
                                        id="cantidad"
                                        type="number"
                                        min="1"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="form-control me-4"
                                        style={{ width: '80px', backgroundColor: '#333', color: mainText, border: `1px solid ${accentBlue}` }}
                                    />
                                    <button 
                                        onClick={handleAdd} 
                                        style={buttonStyle} 
                                        className="btn btn-lg w-100"
                                    >
                                        🚀 Añadir {cantidad} {cantidad > 1 ? 'ítems' : 'ítem'} al Carrito
                                    </button>
                                </div>

                                <small className="d-block mt-3 text-center" style={{ color: secondaryText }}>
                                    Código: {producto.codigo}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailCard;