import React, { useState, useEffect } from 'react';
import PagCatalogo from './Pages/PagCatalogo';
import PagCarrito from './Pages/PagCarrito';
import PagRegistro from './Pages/PagRegistro';
import PagPerfil from './Pages/PagPerfil';
import PagHome from './Pages/PagHome'; 
import PagCheckout from './Pages/PagCheckout'; 
import PagAdmin from './Pages/Admin/Admin';
import ProductDetailCard from './Components/ProductDetailCard'; //
import { getProductByCode } from './Data/Productos'; //
import type { Producto } from './Interfaces/Producto';
import type { Item } from './Interfaces/ItemCarrito'; 
import type { Usuario } from './Interfaces/Usuario';
import SupportChat from './Components/SupportChat'; 
import Navbar, { type View } from './Components/NavBar';
import Footer from './Components/Footer'; 
import './App.css'; 


const getInitialCart = (): Item[] => {
  const savedCart = localStorage.getItem('level-up-cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

function App() {
  const [cartItems, setCartItems] = useState<Item[]>(getInitialCart); 
  
  const [currentView, setCurrentView] = useState<View>('home'); 

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

  const [selectedProductCode, setSelectedProductCode] = useState<string | undefined>(undefined);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [failedCart, setFailedCart] = useState<Item[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    localStorage.setItem('level-up-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleUpdateProfile = (updatedUser: Usuario) => {
      setCurrentUser(updatedUser);
      console.log('Perfil actualizado con éxito!', updatedUser);
  };

  const handleAddToCart = (productoAñadir: Producto, cantidad: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.producto.codigo === productoAñadir.codigo); 

      if (existingItem) {
        return prevItems.map(item =>
          item.producto.codigo === productoAñadir.codigo
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevItems, { producto: productoAñadir, cantidad: cantidad }];
      }
    });
  };

  const handlePaymentSuccess = (orderId: string) => {
     setFailedCart(cartItems);
      setCartItems([]); 
      setLastOrderId(orderId);
      setCurrentView('pagoExito');
  };

  const handlePaymentFailure = (orderId: string, failedItems: Item[]) => {
      setLastOrderId(orderId);
      setFailedCart(failedItems); 
      setCurrentView('pagoError');
  };
  
  const CustomPaymentView: React.FC<{ success: boolean }> = ({ success }) => {
    const color = success ? '#39FF14' : 'red';
    const itemsToShow = failedCart;
    const total = itemsToShow.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    const formatPrice = (price: number) => price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    
    return (
        <div className="container my-5 p-4" style={{ border: `2px solid ${color}`, borderRadius: '8px', backgroundColor: '#111', color: '#FFFFFF' }}>
            <h2 style={{ color: color, fontFamily: 'Orbitron, sans-serif' }} className="mb-4">
                {success ? '✅' : '❌'} {success ? '¡Compra Exitosa!' : 'Error al Procesar el Pago'} Nro. {lastOrderId}
            </h2>
            
            {!success && (
                <button onClick={() => setCurrentView('checkout')} className="btn btn-lg mb-4" style={{ backgroundColor: '#1E90FF', color: '#FFFFFF', fontWeight: 'bold' }}>
                    VOLVER A REALIZAR EL PAGO
                </button>
            )}

            <h3 className="text-end" style={{ color: color }}>Total pagado: {formatPrice(total)}</h3>
            
            {success && (
                <button onClick={() => setCurrentView('catalogo')} className="btn btn-lg mt-3 w-100" style={{ backgroundColor: '#39FF14', color: '#000000', fontWeight: 'bold' }}>
                    Volver al Catálogo
                </button>
            )}
        </div>
    );
  };


  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <PagHome onAddToCart={(p) => handleAddToCart(p, 1)} />;
      case 'registro':
        return <PagRegistro />;
      case 'carrito':
        return <PagCarrito items={cartItems} onCheckout={() => setCurrentView('checkout')} />;
      case 'checkout':
        return (
          <PagCheckout
            items={cartItems}
            user={currentUser}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={handlePaymentFailure}
          />
        );
      case 'pagoExito':
      case 'pagoError':
        return <CustomPaymentView success={currentView === 'pagoExito'} />;
      case 'perfil':
        return <PagPerfil user={currentUser} onUpdate={handleUpdateProfile} />;
      case 'detalleProducto':
             // Lógica CORREGIDA para detalle de producto
        if (selectedProductCode) {
          const producto = getProductByCode(selectedProductCode);
          if (producto) {
                // Se usa el componente ProductDetailCard para mostrar los detalles del producto
            return <ProductDetailCard producto={producto} onAddToCart={handleAddToCart} />;
          }
        }
        return <PagCatalogo onAddToCart={(p) => handleAddToCart(p, 1)} />;
      case 'catalogo':
        return <PagCatalogo onAddToCart={(p) => handleAddToCart(p, 1)} />;

      case 'adminPanel':
        return isAdmin ? <PagAdmin /> : <PagCatalogo onAddToCart={(p) => handleAddToCart(p, 1)} />;
      default:
        return <PagCatalogo onAddToCart={(p) => handleAddToCart(p, 1)} />;
    }
  };
  
  return (
    <div className="app-container">
      <Navbar 
          currentView={currentView}
          onViewChange={setCurrentView}
          cartItemCount={cartItems.length}
      />

      <main>
          {renderView()}
      </main>
      
      <SupportChat />
      <Footer /> 
    </div>
  );
}

export default App;