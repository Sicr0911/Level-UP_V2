import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/ProductoAPIService';
import { Producto } from '../Interfaces/Producto';

interface PagDetalleProps {
    onAddToCart: (producto: Producto) => void;
}

const PagDetalle: React.FC<PagDetalleProps> = ({ onAddToCart }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getProductById(Number(id))
                .then(data => setProducto(data))
                .catch(() => alert("Producto no encontrado"))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="container mt-5 text-white">Cargando...</div>;
    if (!producto) return <div className="container mt-5 text-white">Producto no encontrado</div>;

    return (
        <div className="container py-5">
            <button onClick={() => navigate(-1)} className="btn btn-outline-light mb-4">← Volver</button>
            
            <div className="card bg-dark text-white shadow-lg border-secondary">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img 
                            src={producto.imagen.startsWith('/') ? producto.imagen : `/IMG/${producto.imagen}`} 
                            className="img-fluid rounded-start h-100" 
                            style={{objectFit: 'cover', minHeight: '400px'}}
                            alt={producto.name} 
                            onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500'}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body p-5">
                            <h2 className="card-title display-5 fw-bold mb-3">{producto.name}</h2>
                            <span className="badge bg-primary mb-3 fs-6">{producto.categoria}</span>
                            
                            <p className="card-text fs-5 mt-3">{producto.descripcion}</p>
                            
                            <h3 className="text-success fw-bold my-4">
                                ${producto.precio.toLocaleString('es-CL')}
                            </h3>

                            <p className={producto.stock < 5 ? "text-danger fw-bold" : "text-muted"}>
                                Stock disponible: {producto.stock}
                            </p>

                            <button 
                                className="btn btn-primary btn-lg w-100 mt-3"
                                onClick={() => onAddToCart(producto)}
                                disabled={producto.stock === 0}
                            >
                                {producto.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagDetalle;