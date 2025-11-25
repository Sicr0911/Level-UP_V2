import React from 'react';
import type { Producto } from '../Interfaces/Producto';

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF';
const secondaryText = '#D3D3D3';

interface ProductCardProps {
  producto: Producto;
  onAddToCart: (producto: Producto) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto, onAddToCart }) => {

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    });
  };

  const getRating = () => {
      const stars = Math.floor(Math.random() * 2) + 4;
      return '⭐'.repeat(stars);
  }

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{producto.nombre}</h3>
      <p style={categoryStyle}>Categoría: {producto.categoria}</p>

      <p style={ratingStyle}>
          Calificación: {getRating()}
      </p>

      <p style={priceStyle}>{formatPrice(producto.precio)}</p>

      <p style={descriptionStyle}>{producto.descripcion.substring(0, 100)}...</p>

      <button style={buttonStyle} onClick={() => onAddToCart(producto)}>
        Añadir al Carrito
      </button>
      
      <div style={shareContainerStyle}>
          <p style={{ margin: '5px 0', fontSize: '0.8em', color: secondaryText }}>
              ¡Comparte este item!
          </p>
          <span 
              style={{...shareIconStyle, color: '#1E90FF'}} 
              title="Compartir en Facebook"
              onClick={() => alert(`Compartiendo ${producto.nombre} en Facebook...`)}
          >
              📘
          </span>
          <span 
              style={{...shareIconStyle, color: '#39FF14'}} 
              title="Compartir en X (Twitter)"
              onClick={() => alert(`Compartiendo ${producto.nombre} en X...`)}
          >
              🐦
          </span>
      </div>
    </div>
  );
};

export default ProductCard;

const cardStyle: React.CSSProperties = {
  backgroundColor: primaryColor,
  border: `2px solid ${accentBlue}`,
  borderRadius: '8px',
  padding: '15px',
  margin: '10px',
  width: '300px',
  color: mainText,
  fontFamily: 'Roboto, sans-serif'
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'Orbitron, sans-serif',
  color: accentBlue,
  marginBottom: '5px',
};

const categoryStyle: React.CSSProperties = {
    color: secondaryText,
    fontSize: '0.9em'
}

const ratingStyle: React.CSSProperties = {
    color: neonGreen,
    fontSize: '1em',
    marginBottom: '5px',
};

const priceStyle: React.CSSProperties = {
  fontSize: '1.4em',
  fontWeight: 'bold',
  color: neonGreen,
  margin: '10px 0',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '0.9em',
  color: secondaryText,
  minHeight: '40px'
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: accentBlue,
  color: mainText,
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
  fontWeight: 'bold'
};

const shareContainerStyle: React.CSSProperties = {
    marginTop: '15px',
    borderTop: `1px solid ${secondaryText}`,
    paddingTop: '10px',
    textAlign: 'center'
};

const shareIconStyle: React.CSSProperties = {
    fontSize: '1.5em',
    margin: '0 8px',
    cursor: 'pointer',
};