import React from 'react';

const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF'; 
const secondaryText = '#D3D3D3'; 
const headerFont = 'Orbitron, sans-serif';

const bannerStyle: React.CSSProperties = {
    backgroundColor: '#111',
    border: `2px solid ${accentBlue}`,
    color: mainText,
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: `0 0 15px ${accentBlue}`,
    margin: '30px 0',
};

const HomeBanner: React.FC = () => {
  return (
    <div className="container">
      <div style={bannerStyle} className="p-4">
        <h2 style={{ fontFamily: headerFont, color: neonGreen, fontSize: '2.5em' }}>
          ¡Nuevos Lanzamientos Level-Up!
        </h2>
        <p style={{ color: secondaryText, fontSize: '1.2em' }}>
          Encuentra las últimas consolas, juegos y accesorios para mejorar tu setup.
        </p>
        <button 
          className="btn btn-lg mt-3" 
          style={{ 
            backgroundColor: accentBlue, 
            color: mainText, 
            fontWeight: 'bold',
            border: `1px solid ${neonGreen}`
          }}
          onClick={() => console.log('Navegar a Ofertas')}
        >
          Ver Ofertas Flash
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;