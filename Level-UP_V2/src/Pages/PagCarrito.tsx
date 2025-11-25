import React, { useState, useMemo } from 'react';
import ProductCard from '../Components/ProductoDesc'; 
import { getAllProducts } from '../Data/Productos'; 
import type { Producto } from '../Interfaces/Producto';

interface PagCatalogoProps {
    onAddToCart: (producto: Producto) => void; 
}

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF';
const headerFont = 'Orbitron, sans-serif';

const allProducts = getAllProducts(); 
const allCategories = [...new Set(allProducts.map(p => p.categoria))];

const PagCatalogo: React.FC<PagCatalogoProps> = ({ onAddToCart }) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const filteredProducts = useMemo(() => {
        let tempProducts = allProducts;

        if (selectedCategory !== 'Todos') {
            tempProducts = tempProducts.filter(p => p.categoria === selectedCategory);
        }

        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            tempProducts = tempProducts.filter(p => 
                p.nombre.toLowerCase().includes(lowerCaseSearch) ||
                p.descripcion.toLowerCase().includes(lowerCaseSearch)
            );
        }

        return tempProducts;
    }, [searchTerm, selectedCategory]);

    const pageStyle: React.CSSProperties = {
        backgroundColor: primaryColor,
        minHeight: '100vh',
        color: mainText,
    };

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        fontFamily: headerFont,
        color: accentBlue,
    };

    const filterContainerStyle: React.CSSProperties = {
        backgroundColor: '#111',
        border: `1px solid ${accentBlue}`,
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: '#333',
        color: mainText,
        border: `1px solid ${accentBlue}`,
    };
    
    return (
        <div style={pageStyle} className="container-fluid p-4">
            <h2 style={headerStyle} className="mb-4">🎮 Catálogo de Productos Level-Up Gamer 🎮</h2>

            <div className="row justify-content-center g-3 p-3 rounded-3 mb-4" style={filterContainerStyle}>
                
                <div className="col-12 col-lg-5">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={inputStyle}
                        className="form-control"
                    />
                </div>

                <div className="col-12 col-lg-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={inputStyle}
                        className="form-select"
                    >
                        <option value="Todos">Todas las Categorías</option>
                        {allCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>


            {filteredProducts.length === 0 ? (
                <p style={{textAlign: 'center', color: neonGreen, fontSize: '1.2em'}}>
                    No se encontraron productos que coincidan con los filtros.
                </p>
            ) : (
                <div className="row justify-content-center g-4">
                    {filteredProducts.map((producto) => (
                        <div key={producto.codigo} className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
                            <ProductCard 
                                producto={producto} 
                                onAddToCart={onAddToCart} 
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PagCatalogo;