import React from 'react';
import CheckoutForm from '../Components/CheckoutForm';
import type { Item } from '../Interfaces/ItemCarrito';
import type { Usuario } from '../Interfaces/Usuario';

interface PagCheckoutProps {
    items: Item[];
    user: Usuario;
    onPaymentSuccess: (orderId: string) => void;
    onPaymentFailure: (orderId: string, cartItems: Item[]) => void;
}

const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF';
const headerFont = 'Orbitron, sans-serif';

const formatPrice = (precio: number) => {
    return precio.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
    });
};

const PagCheckout: React.FC<PagCheckoutProps> = ({ items, user, onPaymentSuccess, onPaymentFailure }) => {
    
    const subtotal = items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    const total = subtotal; 

    const handlePlaceOrder = (userData: any) => {
        console.log("Procesando pago para:", userData);
        
        const isSuccess = Math.random() > 0.5;
        const orderId = `#${Math.floor(Math.random() * 90000) + 10000}`;

        if (isSuccess) {
            onPaymentSuccess(orderId);
        } else {
            onPaymentFailure(orderId, items); 
        }
    };

    if (items.length === 0) {
        return (
            <div className="container my-5 p-5 text-center">
                <h2 style={{ color: accentBlue, fontFamily: headerFont }}>Tu Carrito Está Vacío</h2>
                <p style={{ color: mainText }}>No puedes proceder al checkout sin productos. ¡Añade algo para empezar!</p>
            </div>
        );
    }
    
    return (
        <div className="container my-5">
            <h2 style={{ color: accentBlue, fontFamily: headerFont, textAlign: 'center' }} className="mb-4">
                💳 Finalizar Compra Level-Up
            </h2>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    
                    <h3 className="fs-5 mb-3" style={{ color: neonGreen }}>Resumen de Ítems ({items.length})</h3>
                    <table className="table table-dark table-striped mb-4" style={{border: `1px solid ${accentBlue}`}}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th className="text-end">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.producto.codigo}>
                                    <td style={{ color: mainText }}>{item.producto.nombre}</td>
                                    <td>x{item.cantidad}</td>
                                    <td className="text-end" style={{ color: neonGreen }}>{formatPrice(item.producto.precio * item.cantidad)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2} className="fw-bold" style={{ color: accentBlue }}>Total:</td>
                                <td className="text-end fw-bold" style={{ color: neonGreen }}>{formatPrice(total)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <CheckoutForm 
                        user={user} 
                        subtotal={total} 
                        onPlaceOrder={handlePlaceOrder} 
                    />
                </div>
            </div>
        </div>
    );
};

export default PagCheckout;