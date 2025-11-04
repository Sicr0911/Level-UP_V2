import React from 'react';
import type { Producto } from '../Interfaces/Producto'; 

interface ProductCardProps {
  producto: Producto;
  onAddToCart: (producto: Producto) => void;
}

const descripcionProducto: React.FC<ProductCardProps> = ({ producto, onAddToCart }) => {

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    });
  };
  
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{producto.nombre}</h3>
      <p style={categoryStyle}>Categoría: {producto.categoria}</p>

      <p style={priceStyle}>{formatPrice(producto.precio)}</p>

      <p style={descriptionStyle}>{producto.descripcion.substring(0, 100)}...</p>

      <button style={buttonStyle} onClick={() => onAddToCart(producto)}>
        Añadir al Carrito
      </button>
    </div>
  );
};

export default descripcionProducto;

const cardStyle: React.CSSProperties = {
  backgroundColor: '#000000',
  border: '2px solid #1E90FF',
  borderRadius: '8px',
  padding: '15px',
  margin: '10px',
  width: '300px',
  color: '#FFFFFF',
  fontFamily: 'Roboto, sans-serif'
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'Orbitron, sans-serif',
  color: '#1E90FF',
  marginBottom: '5px',
};

const categoryStyle: React.CSSProperties = {
    color: '#D3D3D3',
    fontSize: '0.9em'
}

const priceStyle: React.CSSProperties = {
  fontSize: '1.4em',
  fontWeight: 'bold',
  color: '#39FF14',
  margin: '10px 0',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '0.9em',
  color: '#D3D3D3',
  minHeight: '40px'
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#1E90FF',
  color: '#FFFFFF',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
  fontWeight: 'bold'
};