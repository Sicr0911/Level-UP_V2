import React, { useState, useEffect } from 'react';
import type { Producto } from '../../Interfaces/Producto';
import { createProduct, updateProduct, getProductByCode, getAllProducts } from '../../Data/Productos';
import AlertMessage from '../../Components/AlertMessage';
import type { AdminView } from '../../Components/AdminLayout';

interface PagAdminProductosCRUDProps {
    type: 'nuevo' | 'editar';
    code?: string; 
    onNavigate: (view: AdminView, productCode?: string) => void;
}

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const mainText = '#FFFFFF';
const secondaryText = '#D3D3D3';
const headerFont = 'Orbitron, sans-serif';

const inputStyle: React.CSSProperties = {
    backgroundColor: '#333',
    border: `1px solid ${accentBlue}`,
    color: mainText,
    borderRadius: '4px',
};

const allCategories = [...new Set(getAllProducts().map(p => p.categoria))];

const PagAdminProductosCRUD: React.FC<PagAdminProductosCRUDProps> = ({ type, code, onNavigate }) => {
    const isEditMode = type === 'editar' && code; 

    const [formData, setFormData] = useState<Producto>({
        codigo: '',
        nombre: '',
        categoria: allCategories[0] || 'Juegos de Mesa',
        precio: 0,
        descripcion: '',
        imagen: ''
    });
    const [mensaje, setMensaje] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (isEditMode) {
            const productoExistente = getProductByCode(code!);
            if (productoExistente) {
                setFormData(productoExistente);
            } else {
                setMensaje({ type: 'error', text: `❌ Producto con código ${code} no encontrado para edición.` });
            }
        } else {
            setFormData({ codigo: '', nombre: '', categoria: allCategories[0] || '', precio: 0, descripcion: '', imagen: '' });
        }
    }, [isEditMode, code]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: id === 'precio' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(null);
        
        if (!isEditMode) {
            const nuevoProducto: Producto = {
                ...formData,
                codigo: `P${Date.now()}`,
                precio: formData.precio || 0,
                imagen: formData.imagen || 'placeholder.png', 
            };
            createProduct(nuevoProducto);
            setMensaje({ type: 'success', text: `✅ Producto ${nuevoProducto.nombre} CREADO con éxito. Código: ${nuevoProducto.codigo}` });
            setFormData({ codigo: '', nombre: '', categoria: allCategories[0] || '', precio: 0, descripcion: '', imagen: '' });
        
        } else {
            const productoActualizado = updateProduct(formData);
            if (productoActualizado) {
                setMensaje({ type: 'success', text: `✅ Producto ${productoActualizado.nombre} (Código: ${productoActualizado.codigo}) ACTUALIZADO con éxito.` });
            } else {
                setMensaje({ type: 'error', text: '❌ Error al actualizar. Producto no encontrado.' });
            }
        }
        
        setTimeout(() => setMensaje(null), 4000);
    };


    return (
        <div className="p-0">
            <h2 style={{ color: accentBlue, fontFamily: headerFont }} className="mb-4">
                {isEditMode ? '⚙️ Editar Producto' : '✨ Nuevo Producto'}
            </h2>
            
            <button 
                className="btn btn-sm mb-4" 
                style={{ backgroundColor: secondaryText, color: primaryColor }}
                onClick={() => onNavigate('productosList')}
            >
                ← Volver al Listado
            </button>

            <div className="p-4 rounded-3" style={{ border: `2px solid ${neonGreen}`, backgroundColor: primaryColor }}>
                
                {mensaje && <AlertMessage type={mensaje.type} message={mensaje.text} />}
                
                <form onSubmit={handleSubmit}>
                    
                    {isEditMode && (
                        <p style={{ color: secondaryText }}>
                            **Editando Producto:** <span style={{ color: neonGreen, fontWeight: 'bold' }}>{formData.codigo}</span>
                        </p>
                    )}

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input type="text" id="nombre" style={inputStyle} className="form-control" value={formData.nombre} onChange={handleChange} required />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="categoria" className="form-label">Categoría:</label>
                            <select id="categoria" style={inputStyle} className="form-select" value={formData.categoria} onChange={handleChange} required>
                                {allCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="precio" className="form-label">Precio (CLP):</label>
                            <input type="number" id="precio" style={inputStyle} className="form-control" value={formData.precio} onChange={handleChange} required min="0" />
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="imagen" className="form-label">URL/Path de Imagen:</label>
                        <input type="text" id="imagen" style={inputStyle} className="form-control" value={formData.imagen} onChange={handleChange} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="form-label">Descripción:</label>
                        <textarea id="descripcion" style={inputStyle} className="form-control" value={formData.descripcion} onChange={handleChange} rows={3} required />
                    </div>

                    <button type="submit" className="btn btn-lg w-100" style={{ backgroundColor: neonGreen, color: primaryColor, fontWeight: 'bold' }}>
                        {isEditMode ? 'Guardar Cambios (Actualizar)' : 'Crear Producto'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PagAdminProductosCRUD;