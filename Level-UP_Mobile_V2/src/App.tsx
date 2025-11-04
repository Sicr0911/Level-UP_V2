import { useState } from 'react';
import PagCatalogo from './Pages/PagCatalogo'; 
import PagCarrito from './Pages/PagCarrito'; 
import PagRegistro from './Pages/PagRegistro';
import type { Producto } from './Interfaces/Producto';
import type { Item } from './Interfaces/ItemCarrito'; 
import PagPerfil from './Pages/PagPerfil';
import type { Usuario } from './Interfaces/Usuario';
import SupportChat from './Components/SupportChat'; 

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
      console.log('Perfil actualizado con éxito!', updatedUser);
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
    if (currentView === 'perfil') {
      return <PagPerfil user={currentUser} onUpdate={handleUpdateProfile} />;
    }
    return <PagCatalogo onAddToCart={handleAddToCart} />;
  };
  
  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', color: '#1E90FF', fontFamily: 'Orbitron, sans-serif' }} className="mt-3">
        LEVEL-UP GAMER - Tienda Online
      </h1>

      <div className="d-flex flex-column flex-md-row justify-content-center p-3 gap-2 border-bottom mb-4" style={{ backgroundColor: '#000000', borderColor: '#39FF14' }}>
        
        <button 
          onClick={() => setCurrentView('catalogo')} 
          className="btn btn-outline-light"
          style={{ 
            backgroundColor: currentView === 'catalogo' ? '#1E90FF' : 'transparent', // Color de acento Azul
            color: 'white', fontWeight: 'bold'
          }}
        >
          Catálogo
        </button>
        
        <button 
          onClick={() => setCurrentView('carrito')} 
          className="btn btn-outline-light"
          style={{ 
            backgroundColor: currentView === 'carrito' ? '#1E90FF' : 'transparent',
            color: 'white', fontWeight: 'bold'
          }}
        >
          🛒 Carrito ({cartItems.length})
        </button>

        <button 
          onClick={() => setCurrentView('registro')} 
          className="btn btn-outline-light" 
          style={{ 
            backgroundColor: currentView === 'registro' ? '#39FF14' : 'transparent',
            color: currentView === 'registro' ? 'black' : 'white', fontWeight: 'bold'
          }}
        >
          👤 Registro
        </button>
        
        <button 
          onClick={() => setCurrentView('perfil')} 
          className="btn btn-outline-light"
          style={{ 
            backgroundColor: currentView === 'perfil' ? '#39FF14' : 'transparent',
            color: currentView === 'perfil' ? 'black' : 'white', fontWeight: 'bold'
          }}
        >
          👤 Perfil 
        </button>
      </div>

      {renderView()}
      
      <SupportChat />
      
    </div>
  );
}

export default App;