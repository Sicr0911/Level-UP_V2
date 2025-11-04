import { useState } from 'react';
import PagCatalogo from './Pages/PagCatalogo'; 
import PagCarrito from './Pages/PagCarrito'; 
import PagRegistro from './Pages/PagRegistro';
import type { Producto } from './Interfaces/Producto';
import type { Item } from './Interfaces/ItemCarrito'; 

import './App.css'; 

function App() {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  
  const [currentView, setCurrentView] = useState<'catalog' | 'cart' | 'register'>('catalog');

  const handleAddToCart = (productoAñadir: Producto) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.producto.codigo === productoAñadir.codigo); 
      
      if (existingItem) {
        return prevItems.map(item =>
          item.producto.codigo === productoAñadir.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevItems, { producto: productoAñadir, cantidad: 1 }];
      }
    });
  };

  const renderView = () => {
    if (currentView === 'register') {
      return <PagRegistro />;
    }
    if (currentView === 'cart') {
      return <PagCarrito items={cartItems} />;
    }
    return <PagCatalogo onAddToCart={handleAddToCart} />;
  };

  const navButtonStyle: React.CSSProperties = {
    color: 'white', 
    border: 'none', 
    padding: '10px 15px', 
    margin: '0 5px', 
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold'
  };

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', color: '#1E90FF', fontFamily: 'Orbitron, sans-serif' }}>
        LEVEL-UP GAMER - Tienda Online
      </h1>

      <div style={{ padding: '10px', backgroundColor: '#000000', textAlign: 'center', borderBottom: '2px solid #39FF14' }}>
        
        <button 
          onClick={() => setCurrentView('catalog')} 
          style={{ 
            ...navButtonStyle,
            backgroundColor: currentView === 'catalog' ? '#1E90FF' : 'transparent',
          }}
        >
          Catálogo
        </button>
        
        <button 
          onClick={() => setCurrentView('cart')} 
          style={{ 
            ...navButtonStyle,
            backgroundColor: currentView === 'cart' ? '#1E90FF' : 'transparent',
          }}
        >
          🛒 Carrito ({cartItems.length})
        </button>

        <button 
          onClick={() => setCurrentView('register')} 
          style={{ 
            ...navButtonStyle,
            backgroundColor: currentView === 'register' ? '#39FF14' : 'transparent',
            color: currentView === 'register' ? 'black' : 'white'
          }}
        >
          👤 Registro
        </button>
      </div>

      {renderView()}
      
    </div>
  );
}

export default App;