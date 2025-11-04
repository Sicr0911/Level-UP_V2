// src/Pages/PagCatalogo.tsx

import React, { useState, useMemo } from 'react';
import ProductCard from '../Components/ProductoDesc'; 
import { PRODUCTOS } from '../Data/Productos';
import type { Producto } from '../Interfaces/Producto';

interface PagCatalogoProps {
    onAddToCart: (producto: Producto) => void; 
}

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF';
const headerFont = 'Orbitron, sans-serif';

const allCategories = [...new Set(PRODUCTOS.map(p => p.categoria))];

const PagCatalogo: React.FC<PagCatalogoProps> = ({ onAddToCart }) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const filteredProducts = useMemo(() => {
        let tempProducts = PRODUCTOS;

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
        padding: '20px',
        color: mainText,
    };

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        fontFamily: headerFont,
        color: accentBlue,
        marginBottom: '30px',
    };

    const catalogContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px'
    };

    const filterContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#111',
        borderRadius: '8px',
        marginBottom: '20px'
    };

    const inputStyle: React.CSSProperties = {
        padding: '10px',
        borderRadius: '5px',
        border: `1px solid ${accentBlue}`,
        backgroundColor: '#333',
        color: mainText,
        minWidth: '250px'
    };
    
    return (
        <div style={pageStyle}>
            <h2 style={headerStyle}>🎮 Catálogo de Productos Level-Up Gamer 🎮</h2>

            <div style={filterContainerStyle}>
                
                <input
                    type="text"
                    placeholder="Buscar por nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={inputStyle}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={inputStyle}
                >
                    <option value="Todos">Todas las Categorías</option>
                    {allCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>


            {filteredProducts.length === 0 ? (
                <p style={{textAlign: 'center', color: neonGreen, fontSize: '1.2em'}}>
                    No se encontraron productos que coincidan con los filtros.
                </p>
            ) : (
                <div style={catalogContainerStyle}>
                    {filteredProducts.map((producto) => (
                        <ProductCard 
                            key={producto.codigo} 
                            producto={producto} 
                            onAddToCart={onAddToCart} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PagCatalogo;