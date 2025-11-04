import { useState } from 'react';
import PagCatalogo from './Pages/PagCatalogo'; 
import PagCarrito from './Pages/PagCarrito'; 
import PagRegistro from './Pages/PagRegistro';
import type { Producto } from './Interfaces/Producto';
import type { Item } from './Interfaces/ItemCarrito'; 
import PagPerfil from './Pages/PagPerfil';
import type { Usuario } from './Interfaces/Usuario';

import './App.css'; 

function App() {
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const [currentView, setCurrentView] = useState<'catalogo' | 'carrito' | 'registro' | 'perfil'>('catalogo');

  const [currentUser, setCurrentUser] = useState<Usuario>({
    id: 'user_001',
    nombre: 'GamerDuoc',
    email: 'gamerduoc@alumnos.duoc.cl',
    fechaNacimiento: '1995-05-20',
    EsDuoc: true,
    EsMayorEdad: true,
    puntosLevelUp: 1500,
    nivel: 5,
  });

  const handleUpdateProfile = (updatedUser: Usuario) => {
      setCurrentUser(updatedUser);
      alert('Perfil actualizado con éxito!');
  };

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
    if (currentView === 'registro') {
      return <PagRegistro />;
    }
    if (currentView === 'carrito') {
      return <PagCarrito items={cartItems} />;
    }
    if (currentView === 'catalogo') {
      return <PagCatalogo onAddToCart={handleAddToCart} />;
    } 
    if (currentView === 'perfil') {
      return <PagPerfil user={currentUser} onUpdate={handleUpdateProfile} />;
    }

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
          onClick={() => setCurrentView('catalogo')} 
          style={{ 
            ...navButtonStyle,
            backgroundColor: currentView === 'catalogo' ? '#1E90FF' : 'transparent',
          }}
        >
          Catálogo
        </button>
        
        <button 
          onClick={() => setCurrentView('carrito')} 
          style={{ 
            ...navButtonStyle,
            backgroundColor: currentView === 'carrito' ? '#1E90FF' : 'transparent',
          }}
        >
          🛒 Carrito ({cartItems.length})
        </button>

        <button 
          onClick={() => setCurrentView('registro')} 
          style={{ 
            ...navButtonStyle,
            backgroundColor: currentView === 'registro' ? '#39FF14' : 'transparent',
            color: currentView === 'registro' ? 'black' : 'white'
          }}
        >
          👤 Registro
        </button>
        <button 
          onClick={() => setCurrentView('perfil')} 
          style={{ 
            backgroundColor: currentView === 'perfil' ? '#39FF14' : 'transparent',
            color: currentView === 'perfil' ? 'black' : 'white'
          }}
        >
          👤 Perfil 
        </button>
      </div>

      {renderView()}
      
    </div>
  );
}

export default App;