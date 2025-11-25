import React from 'react';
import type { Item } from '../Interfaces/ItemCarrito'; 
import type { Usuario } from '../Interfaces/Usuario'; 
import type { Direccion } from '../Interfaces/Direccion'; 
import CheckoutForm from '../Components/CheckoutForm'; 

interface PagCheckoutProps {
    items: Item[];
    user: Usuario;
    onPaymentSuccess: (orderId: string) => void;
    onPaymentFailure: (orderId: string, failedItems: Item[]) => void;
}

const PagCheckout: React.FC<PagCheckoutProps> = ({ items, user, onPaymentSuccess, onPaymentFailure }) => {
    
    const subtotal = items.reduce((acc, item) => {
        return acc + (item.producto.precio * item.cantidad);
    }, 0);

    const handlePlaceOrder = (userData: { nombre: string, apellidos: string, email: string, direccion: Direccion }) => {
        
        const orderId = `ORD-${Date.now()}`;
        
        const isSuccess = subtotal > 0 && Math.random() > 0.3; 

        if (isSuccess) {
            onPaymentSuccess(orderId);
        } else {
            onPaymentFailure(orderId, items); 
        }
    };


    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8"> 
                    <CheckoutForm 
                        user={user}
                        subtotal={subtotal}
                        onPlaceOrder={handlePlaceOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default PagCheckout;