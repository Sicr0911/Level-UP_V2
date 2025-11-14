import React, { useState } from 'react';
import type { Producto } from '../Interfaces/Producto';
import { getAllProducts, deleteProduct } from '../Data/Productos'; 
import AlertMessage from '../Components/AlertMessage';
import type { AdminView } from '../Components/AdminLayout';

interface PagAdminProductosListProps {
    onNavigate: (view: AdminView, productCode?: string) => void;
}

const neonGreen = '#39FF14'; 
const accentBlue = '#1E90FF';
const mainText = '#FFFFFF';

const PagAdminProductosList: React.FC<PagAdminProductosListProps> = ({ onNavigate }) => {
    
    const [productos, setProductos] = useState<Producto[]>(getAllProducts());
    const [mensaje, setMensaje] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleDelete = (codigo: string) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el producto con código ${codigo}?`)) {
            const success = deleteProduct(codigo);
            
            if (success) {
                setProductos(getAllProducts()); 
                setMensaje({ type: 'success', text: `✅ Producto ${codigo} eliminado correctamente.` });
            } else {
                setMensaje({ type: 'error', text: `❌ Error al eliminar el producto ${codigo}. No se encontró.` });
            }

            setTimeout(() => setMensaje(null), 3000);
        }
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('es-CL', {
          style: 'currency',
          currency: 'CLP',
          minimumFractionDigits: 0,
        });
    };

    return (
        <div className="p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: accentBlue }}>Gestión de Productos (CRUD)</h2>
                <button 
                    className="btn btn-sm" 
                    style={{ backgroundColor: neonGreen, color: 'black', fontWeight: 'bold' }}
                    onClick={() => onNavigate('nuevoProducto')} 
                >
                    + Nuevo Producto
                </button>
            </div>
            
            {mensaje && <AlertMessage type={mensaje.type} message={mensaje.text} />}

            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover" style={{ border: `1px solid ${accentBlue}` }}>
                    <thead style={{ color: neonGreen }}>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th className="text-end">Precio</th>
                            <th>Stock (Sim.)</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.codigo}>
                                <td style={{ color: accentBlue }}>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td className="text-end">{formatPrice(producto.precio)}</td>
                                <td>{Math.floor(Math.random() * 50) + 10}</td>
                                <td className="d-flex justify-content-center gap-2">
                                    <button 
                                        className="btn btn-sm btn-primary"
                                        onClick={() => onNavigate('editarProducto', producto.codigo)} 
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(producto.codigo)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {productos.length === 0 && (
                 <p className="text-center mt-5" style={{ color: mainText }}>
                    No hay productos en el catálogo. ¡Crea uno para empezar!
                 </p>
            )}
        </div>
    );
};

export default PagAdminProductosList;