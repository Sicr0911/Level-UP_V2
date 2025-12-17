import React, { useEffect, useState } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../services/ProductoAPIService';
import { Producto } from '../../Interfaces/Producto';

const PagAdmin: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Producto>>({
        name: '', categoria: '', precio: 0, stock: 0, stockCritico: 0, descripcion: '', imagen: ''
    });

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts();
            setProductos(data);
        } catch (err) {
            setError("Error al cargar productos. Verifica que el backend esté online.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'stockCritico' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateProduct(editingId, formData);
                alert("Producto actualizado correctamente");
            } else {
                await createProduct(formData);
                alert("Producto creado correctamente");
            }
            setShowForm(false);
            setFormData({ name: '', categoria: '', precio: 0, stock: 0, stockCritico: 0, descripcion: '', imagen: '' });
            setEditingId(null);
            loadProducts();
        } catch (err) {
            alert("Error al guardar. Verifica los datos (precio positivo, campos llenos).");
        }
    };

    const handleEdit = (prod: Producto) => {
        setFormData(prod);
        setEditingId(prod.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de eliminar este juego?")) {
            try {
                await deleteProduct(id);
                loadProducts();
            } catch (err) {
                alert("No se pudo eliminar. Puede que tenga ventas asociadas.");
            }
        }
    };

    const totalProductos = productos.length;
    const valorInventario = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
    const stockCriticoCount = productos.filter(p => p.stock <= (p.stockCritico || 5)).length;

    if (loading) return <div className="container mt-5">Cargando panel...</div>;

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">🛠️ Panel de Administración</h2>
                <button className="btn btn-success" onClick={() => { setShowForm(true); setEditingId(null); setFormData({name:'', categoria:'Acción', precio:0, stock:0, imagen:'', descripcion:''}); }}>
                    + Nuevo Juego
                </button>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card bg-primary text-white">
                        <div className="card-body text-center">
                            <h5>Juegos en Catálogo</h5>
                            <h2>{totalProductos}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-warning text-dark">
                        <div className="card-body text-center">
                            <h5>Valor Inventario (CLP)</h5>
                            <h2>${valorInventario.toLocaleString('es-CL')}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-danger text-white">
                        <div className="card-body text-center">
                            <h5>Stock Crítico</h5>
                            <h2>{stockCriticoCount} juegos</h2>
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {showForm && (
                <div className="card mb-4 shadow p-3 border-primary">
                    <h4>{editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <label>Nombre</label>
                                <input name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-3 mb-2">
                                <label>Categoría</label>
                                <select name="categoria" className="form-select" value={formData.category} onChange={handleInputChange} required>
                                    <option value="">Seleccione...</option>
                                    <option value="Acción">Acción</option>
                                    <option value="Aventura">Aventura</option>
                                    <option value="RPG">RPG</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Estrategia">Estrategia</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-2">
                                <label>Precio</label>
                                <input type="number" name="precio" className="form-control" value={formData.precio} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-3 mb-2">
                                <label>Stock</label>
                                <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-3 mb-2">
                                <label>Stock Crítico</label>
                                <input type="number" name="stockCritico" className="form-control" value={formData.stockCritico} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>URL Imagen</label>
                                <input name="imagen" className="form-control" value={formData.imagen} onChange={handleInputChange} placeholder="ej: /IMG/juego.jpg" />
                            </div>
                            <div className="col-12 mb-2">
                                <label>Descripción</label>
                                <textarea name="descripcion" className="form-control" value={formData.descripcion} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Guardar</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
                    </form>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>
                                    <img src={p.imagen?.startsWith('/') ? p.imagen : `/IMG/${p.imagen}`} alt="mini" style={{height:'40px'}} />
                                </td>
                                <td>{p.name}</td>
                                <td>{p.categoria}</td>
                                <td>${p.precio.toLocaleString()}</td>
                                <td className={p.stock <= (p.stockCritico || 0) ? 'text-danger fw-bold' : ''}>
                                    {p.stock}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>✏️</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PagAdmin;