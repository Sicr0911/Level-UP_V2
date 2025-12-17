import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/ProductoAPIService';
import { Producto } from '../Interfaces/Producto';

interface PagCatalogoProps {
  onAddToCart: (producto: Producto) => void;
}

const PagCatalogo: React.FC<PagCatalogoProps> = ({ onAddToCart }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getAllProducts();
        setProductos(data);
      } catch (err) {
        setError("Error al cargar los productos. Asegúrate de que el backend esté corriendo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = filtroCategoria === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === filtroCategoria);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div><p>Cargando catálogo...</p></div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 display-5 fw-bold text-uppercase" style={{ color: '#00d2ff', textShadow: '0 0 10px rgba(0,210,255,0.5)' }}>
        Catálogo Gamer
      </h2>

      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {categorias.map(cat => (
          <button 
            key={cat} 
            className={`btn ${filtroCategoria === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setFiltroCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productosFiltrados.map((producto) => (
          <div className="col" key={producto.id}>
            <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
              <img 
                src={producto.imagen.startsWith('/') ? producto.imagen : `/IMG/${producto.imagen}`} 
                className="card-img-top p-3" 
                alt={producto.name}
                style={{ height: '250px', objectFit: 'contain' }}
                onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/250?text=No+Image';
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{producto.name}</h5>
                <p className="card-text text-muted small">{producto.categoria}</p>
                <p className="card-text flex-grow-1">{producto.descripcion.substring(0, 80)}...</p>
                
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fs-4 fw-bold text-success">
                            ${producto.precio.toLocaleString('es-CL')}
                        </span>
                        <span className={`badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                            {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                        </span>
                    </div>
                    
                    <button 
                        className="btn btn-primary w-100 fw-bold"
                        onClick={() => onAddToCart(producto)}
                        disabled={producto.stock === 0}
                    >
                        {producto.stock > 0 ? '🛒 Añadir al Carrito' : 'Sin Stock'}
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagCatalogo;