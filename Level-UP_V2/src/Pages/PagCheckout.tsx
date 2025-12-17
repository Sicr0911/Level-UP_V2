import React, { useState } from 'react';
import axios from 'axios';
import { authHeader } from '../services/AuthService';
import { Item } from '../Interfaces/ItemCarrito';

interface PagCheckoutProps {
    items: Item[];
    user: any;
    onSuccess: () => void;
}

const PagCheckout: React.FC<PagCheckoutProps> = ({ items, user, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error', texto: string } | null>(null);

    const total = items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);

    const handlePagar = async () => {
        setLoading(true);
        setMensaje(null);

        const orderData = {
            items: items.map(i => ({
                productId: i.producto.id,
                quantity: i.cantidad,
                price: i.producto.precio 
            }))
        };

        try {
            await axios.post('http://localhost:8080/api/orders', orderData, { headers: authHeader() });
            
            setMensaje({ tipo: 'success', texto: '¡Compra realizada con éxito! Revisa "Mis Compras".' });
            onSuccess();
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.error || "Error al procesar el pago. Verifica el stock.";
            setMensaje({ tipo: 'error', texto: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0 && !mensaje) {
        return <div className="container mt-5 text-center"><h3>Tu carrito está vacío 🛒</h3></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white">
                            <h4>Resumen de Pedido</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group mb-3">
                                {items.map((item, idx) => (
                                    <li key={idx} className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">{item.producto.name}</h6>
                                            <small className="text-muted">Cantidad: {item.cantidad}</small>
                                        </div>
                                        <span className="text-muted">${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}</span>
                                    </li>
                                ))}
                                <li className="list-group-item d-flex justify-content-between bg-light">
                                    <span>Total (CLP)</span>
                                    <strong>${total.toLocaleString('es-CL')}</strong>
                                </li>
                            </ul>

                            <div className="mb-3">
                                <label className="form-label">Comprador</label>
                                <input type="text" className="form-control" value={user.username} disabled />
                            </div>

                            {mensaje && (
                                <div className={`alert alert-${mensaje.tipo === 'success' ? 'success' : 'danger'}`}>
                                    {mensaje.texto}
                                </div>
                            )}

                            {mensaje?.tipo !== 'success' && (
                                <button 
                                    className="btn btn-primary w-100 btn-lg" 
                                    onClick={handlePagar}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : 'Pagar Ahora 💳'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagCheckout;