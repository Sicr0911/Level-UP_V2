import React from 'react';
import ProductCard from '../Components/ProductoDesc';
import { PRODUCTOS } from '../Data/Productos'; 
import type { Producto } from '../Interfaces/Producto';

interface PagCatalogoProps {
    onAddToCart: (producto: Producto) => void; 
}

const PaginaCatalogo: React.FC<PagCatalogoProps> = ({ onAddToCart }) => {
  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>🎮 Catálogo de Productos Level-Up Gamer 🎮</h2>

        <div style={catalogContainerStyle}>
        {PRODUCTOS.map((producto) => (
          <ProductCard key={producto.codigo} producto={producto} 
          onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default PaginaCatalogo;

const pageStyle: React.CSSProperties = {
  backgroundColor: '#000000',
  minHeight: '100vh',
  padding: '20px',
  color: '#FFFFFF',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  fontFamily: 'Orbitron, sans-serif',
  color: '#1E90FF',
  marginBottom: '30px',
};

const catalogContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};