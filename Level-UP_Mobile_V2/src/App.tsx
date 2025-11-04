import { useState } from 'react';
import PagCatalogo from './Pages/PagCatalogo'; 
import PagCarrito from './Pages/PagCarrito'; 
import type { Producto } from './Interfaces/Producto';
import type { Item } from './Interfaces/ItemCarrito'; 

import './App.css'; 

function App() {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  
  const [isCatalogView, setIsCatalogView] = useState(true);

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

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', color: '#1E90FF', fontFamily: 'Orbitron, sans-serif' }}>
        LEVEL-UP GAMER - Tienda Online
      </h1>

      <div style={{ padding: '10px', backgroundColor: '#000000', textAlign: 'right', borderBottom: '1px solid #39FF14' }}>
        <button 
          onClick={() => setIsCatalogView(true)} 
          style={{ backgroundColor: isCatalogView ? '#1E90FF' : 'transparent', color: 'white', border: 'none', padding: '10px', margin: '0 5px', cursor: 'pointer' }}
        >
          Catálogo
        </button>
        <button 
          onClick={() => setIsCatalogView(false)} 
          style={{ backgroundColor: !isCatalogView ? '#1E90FF' : 'transparent', color: 'white', border: 'none', padding: '10px', margin: '0 5px', cursor: 'pointer' }}
        >
          🛒 Carrito ({cartItems.length})
        </button>
      </div>

      {isCatalogView ? (
        <PagCatalogo onAddToCart={handleAddToCart} />
      ) : (
        <PagCarrito items={cartItems} />
      )}
      
    </div>
  );
}

export default App;