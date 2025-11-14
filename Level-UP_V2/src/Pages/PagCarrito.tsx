import React from 'react';
import type { Item } from '../Interfaces/ItemCarrito'; 

interface PaginaCarrito {
  items: Item[];
  onCheckout: () => void;
}

const formatPrice = (precio: number) => {
  return precio.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });
};

const primaryColor = '#000000'; 
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF';
const secondaryText = '#D3D3D3'; 
const headerFont = 'Orbitron, sans-serif';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  fontFamily: headerFont,
  color: accentBlue,
};

const summaryStyle: React.CSSProperties = {
    textAlign: 'right',
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: `2px solid ${accentBlue}`,
};

const priceSummaryStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: neonGreen
}

const checkoutButton: React.CSSProperties = {
    backgroundColor: neonGreen, 
    color: primaryColor,
    fontWeight: 'bold',
};


const PagCarrito: React.FC<PaginaCarrito> = ({ items, onCheckout }) => {
  
  const subtotal = items.reduce((acc, item) => {
    return acc + (item.producto.precio * item.cantidad);
  }, 0);

  const total = subtotal; 

  const itemStyle: React.CSSProperties = {
      borderTop: `1px dotted ${secondaryText}`
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: primaryColor,
    color: mainText,
    border: `1px solid ${accentBlue}`,
  };

  return (
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-12 col-lg-8"> 
                <div style={containerStyle} className="p-4 rounded-3">
                    <h2 style={headerStyle} className="mb-4">
                        🛍️ Resumen de Carrito Level-Up Gamer
                    </h2>

                    {items.length === 0 ? (
                        <p className="text-center" style={{ color: secondaryText }}>Tu carrito está vacío. ¡Es hora de subir de nivel tus compras!</p>
                    ) : (
                        <>
                            <div className="mb-4 border-bottom" style={{ borderColor: secondaryText }}>
                                {items.map((item) => (
                                    <div key={item.producto.codigo} className="d-flex justify-content-between py-2" style={itemStyle}>
                                        <span className="text-success me-3" style={{ flex: 2, color: neonGreen }}>{item.producto.nombre}</span>
                                        <span className="text-secondary me-3" style={{ flex: 1 }}>Cantidad: x{item.cantidad}</span>
                                        <span className="text-end fw-bold" style={{ flex: 1 }}>
                                          {formatPrice(item.producto.precio * item.cantidad)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div style={summaryStyle}>
                                <p style={{color: secondaryText}}>Subtotal: <span style={priceSummaryStyle}>{formatPrice(subtotal)}</span></p>
                                <p style={{fontSize: '1.4em', color: mainText}}>Total a Pagar: <span style={priceSummaryStyle}>{formatPrice(total)}</span></p>
                                
                                <button 
                                    style={checkoutButton} 
                                    className="btn w-100"
                                    onClick={onCheckout} 
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PagCarrito;