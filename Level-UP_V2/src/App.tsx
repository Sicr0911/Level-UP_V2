import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import PagHome from './Pages/PagHome';
import PagCatalogo from './Pages/PagCatalogo';
import PagDetalle from './Pages/PagDetalle';
import PagCarrito from './Pages/PagCarrito';
import PagRegistro from './Pages/PagRegistro';
import PagLogin from './Pages/PagLogin';
import PagCheckout from './Pages/PagCheckout';
import PagPerfil from './Pages/PagPerfil';
import PagBlog from './Pages/PagBlog'; 
import PagAdmin from './Pages/Admin/Admin';

// Componentes y Servicios
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import SupportChat from './Components/SupportChat';
import { getCurrentUser, logout } from './services/AuthService';
import { Item } from './Interfaces/ItemCarrito';
import { Producto } from './Interfaces/Producto';
import './App.css';

const getInitialCart = (): Item[] => {
  const savedCart = localStorage.getItem('level-up-cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

function App() {
  const [cartItems, setCartItems] = useState<Item[]>(getInitialCart);
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);
  }, []);

  useEffect(() => {
    localStorage.setItem('level-up-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleLogout = () => {
    logout();
    setUser(undefined);
    window.location.href = "/"; 
  };

  const handleAddToCart = (productoAñadir: Producto, cantidad: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.producto.id === productoAñadir.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.producto.id === productoAñadir.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevItems, { producto: productoAñadir, cantidad: cantidad }];
      }
    });
  };

  const clearCart = () => setCartItems([]);

  // Lógica de roles
  const isAdmin = user && user.username && (user.username.includes("admin") || user.username.includes("vendedor"));

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />

        <main className="flex-grow-1">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<PagHome onAddToCart={handleAddToCart} />} />
            <Route path="/login" element={<PagLogin />} />
            <Route path="/registro" element={<PagRegistro />} />
            
            <Route path="/catalogo" element={<PagCatalogo onAddToCart={handleAddToCart} />} />
            <Route path="/producto/:id" element={<PagDetalle onAddToCart={handleAddToCart} />} />
            
            <Route path="/blog" element={<PagBlog />} /> 
            <Route path="/carrito" element={<PagCarrito items={cartItems} />} />

            <Route path="/checkout" element={
              user ? 
              <PagCheckout items={cartItems} user={user} onSuccess={clearCart} /> : 
              <Navigate to="/login" />
            } />
            
            <Route path="/perfil" element={
              user ? <PagPerfil user={user} /> : <Navigate to="/login" />
            } />

            <Route path="/admin/*" element={
              isAdmin ? <PagAdmin /> : <Navigate to="/" />
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <SupportChat />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;