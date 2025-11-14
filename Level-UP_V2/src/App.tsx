// src/App.tsx

import { useState } from 'react';
import PagCatalogo from './Pages/PagCatalogo'; 
import PagCarrito from './Pages/PagCarrito'; 
import PagRegistro from './Pages/PagRegistro';
import type { Producto } from './Interfaces/Producto';
import type { Item } from './Interfaces/ItemCarrito'; 
import PagPerfil from './Pages/PagPerfil';
import type { Usuario } from './Interfaces/Usuario';
import SupportChat from './Components/SupportChat'; 
import Navbar, { type View } from './Components/NavBar';
import './App.css'; 

function App() {
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const [currentView, setCurrentView] = useState<View>('catalogo'); 

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
    if (currentView === 'catalogo' || currentView === 'home') {
        return <PagCatalogo onAddToCart={handleAddToCart} />;
    }
    
    return (
        <div className="container p-5 text-center">
            <h2 style={{ color: '#FF5733', fontFamily: 'Orbitron, sans-serif' }}>Página en Construcción 🚧</h2>
            <p style={{ color: '#D3D3D3' }}>La vista de **{currentView.toUpperCase()}** aún no ha sido implementada.</p>
        </div>
    );
  };
  
  return (
    <div className="app-container">
      <Navbar 
          currentView={currentView}
          onViewChange={setCurrentView}
          cartItemCount={cartItems.length}
      />

      {renderView()}
      
      <SupportChat />
      
    </div>
  );
}

export default App;