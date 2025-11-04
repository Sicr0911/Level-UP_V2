import React from 'react';
import type { Item } from '../Interfaces/ItemCarrito'; 

interface PaginaCarrito {
  items: Item[];
}

const formatPrice = (precio: number) => {
  return precio.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });
};

const PagCarrito: React.FC<PaginaCarrito> = ({ items }) => {
  
  const subtotal = items.reduce((acc, item) => {
    return acc + (item.producto.precio * item.cantidad);
  }, 0);

  const total = subtotal; 

  const primaryColor = '#000000'; 
  const accentBlue = '#1E90FF';
  const neonGreen = '#39FF14';
  const mainText = '#FFFFFF';
  const secondaryText = '#D3D3D3'; 
  const fontFamily = 'Roboto, sans-serif';
  const headerFont = 'Orbitron, sans-serif';
  
  const pageStyle: React.CSSProperties = {
    backgroundColor: primaryColor,
    minHeight: '80vh',
    padding: '40px 20px',
    color: mainText,
    fontFamily: fontFamily,
    maxWidth: '800px',
    margin: '20px auto',
    border: `1px solid ${accentBlue}`,
    borderRadius: '10px'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    fontFamily: headerFont,
    color: accentBlue,
    marginBottom: '30px',
  };

  const itemsContainerStyle: React.CSSProperties = {
      marginBottom: '20px',
      borderBottom: `1px solid ${secondaryText}`
  };

  const itemStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderTop: `1px dotted ${secondaryText}`
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
      border: 'none',
      padding: '12px 30px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      fontWeight: 'bold',
      fontSize: '1.1em'
  };

  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>🛍️ Resumen de Carrito Level-Up Gamer</h2>

      {items.length === 0 ? (
        <p style={{ textAlign: 'center', color: secondaryText }}>Tu carrito está vacío. ¡Es hora de subir de nivel tus compras!</p>
      ) : (
        <>
          <div style={itemsContainerStyle}>
            {items.map((item) => (
              <div key={item.producto.codigo} style={itemStyle}>
                <span style={{ flex: 2, color: neonGreen }}>{item.producto.nombre}</span>
                <span style={{ flex: 1, color: secondaryText }}>Cantidad: x{item.cantidad}</span>
                <span style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>
                  {formatPrice(item.producto.precio * item.cantidad)}
                </span>
              </div>
            ))}
          </div>

          <div style={summaryStyle}>
            <p style={{color: secondaryText}}>Subtotal: <span style={priceSummaryStyle}>{formatPrice(subtotal)}</span></p>
            <p style={{fontSize: '1.4em', color: mainText}}>Total a Pagar: <span style={priceSummaryStyle}>{formatPrice(total)}</span></p>
            
            <button style={checkoutButton}>
                Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PagCarrito;