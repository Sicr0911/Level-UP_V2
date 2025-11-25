import React, { useMemo } from 'react';
import type { Item } from '../Interfaces/ItemCarrito';
import AlertMessage from '../Components/AlertMessage';

interface PagCarritoProps {
    items: Item[];
    onCheckout: () => void;
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

const PagCarrito: React.FC<PagCarritoProps> = ({ items, onCheckout }) => {
    
    const subtotal = useMemo(() => {
        return items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    }, [items]);

    const pageStyle: React.CSSProperties = {
        backgroundColor: primaryColor,
        minHeight: '100vh',
        color: mainText,
    };
    
    const cardStyle: React.CSSProperties = {
        backgroundColor: '#111',
        border: `3px solid ${accentBlue}`,
        color: mainText,
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px'
    };
    
    const checkoutButtonStyle: React.CSSProperties = {
        backgroundColor: neonGreen,
        color: primaryColor,
        fontWeight: 'bold',
        border: 'none',
    };

    if (items.length === 0) {
        return (
            <div style={pageStyle} className="container p-4 text-center">
                <h2 style={{ color: accentBlue, fontFamily: headerFont }} className="mb-4">🛒 Tu Carrito</h2>
                <AlertMessage 
                    type="info" 
                    message="Tu carrito está vacío. ¡Es hora de subir de nivel tus compras!"
                />
                <button 
                    className="btn btn-lg mt-4"
                    style={{ backgroundColor: accentBlue, color: mainText }}
                    onClick={() => console.log('Simular navegación a catálogo')} 
                >
                    Volver al Catálogo
                </button>
            </div>
        );
    }

    return (
        <div style={pageStyle} className="container p-4">
            <h2 style={{ color: accentBlue, fontFamily: headerFont, textAlign: 'center' }} className="mb-4">🛒 Mi Carrito Level-Up</h2>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    
                    {items.map((item, index) => (
                        <div key={index} style={cardStyle} className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div style={{width: '60px', height: '60px', marginRight: '15px', backgroundColor: '#333', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <span style={{fontSize: '2em'}}>{item.producto.categoria === 'Consolas' ? '🎮' : '📦'}</span>
                                </div>
                                <div>
                                    <h5 style={{ color: neonGreen, fontFamily: headerFont }} className="mb-1">{item.producto.nombre}</h5>
                                    <p className="mb-0" style={{ fontWeight: 'bold' }}>
                                        Cantidad: x{item.cantidad}
                                    </p>
                                </div>
                            </div>
                            <div className="text-end">
                                <p className="mb-1" style={{ color: secondaryText, fontSize: '0.9em' }}>
                                    {formatPrice(item.producto.precio)} c/u
                                </p>
                                <span className="fs-5" style={{ color: accentBlue, fontWeight: 'bold' }}>
                                    {formatPrice(item.producto.precio * item.cantidad)}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="text-end mt-4 p-3" style={{ borderTop: `2px dashed ${neonGreen}` }}>
                        <h4 className="mb-0">
                            Total a Pagar: <span style={{ color: neonGreen }}>{formatPrice(subtotal)} CLP</span>
                        </h4>
                    </div>
                    
                    <button 
                        onClick={onCheckout} 
                        style={checkoutButtonStyle} 
                        className="btn btn-lg w-100 mt-3"
                        disabled={subtotal === 0}
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PagCarrito;