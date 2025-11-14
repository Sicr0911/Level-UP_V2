import React from 'react';
import HomeBanner from '../Components/HomeBanner';
import PagCatalogo from './PagCatalogo'; 
import type { Producto } from '../Interfaces/Producto';

interface PagHomeProps {
    onAddToCart: (producto: Producto) => void;
}

const headerFont = 'Orbitron, sans-serif';
const neonGreen = '#39FF14'; 

const PagHome: React.FC<PagHomeProps> = ({ onAddToCart }) => {
    
    return (
        <div className="container-fluid p-0">
            
            <HomeBanner />
            
            <h2 className="text-center mt-5 mb-4" style={{ fontFamily: headerFont, color: neonGreen }}>
                Categorías Destacadas
            </h2>
            
            <PagCatalogo 
                onAddToCart={onAddToCart} 
            />

        </div>
    );
};

export default PagHome;