import React from 'react';

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const secondaryText = '#D3D3D3'; 
const headerFont = 'Orbitron, sans-serif';

const footerStyle: React.CSSProperties = {
    backgroundColor: primaryColor,
    borderTop: `2px solid ${neonGreen}`,
    color: secondaryText,
    paddingTop: '30px',
    paddingBottom: '20px',
    fontFamily: 'Roboto, sans-serif',
};

const titleStyle: React.CSSProperties = {
    color: accentBlue,
    fontFamily: headerFont,
    fontSize: '1.2em',
    marginBottom: '10px',
};

const linkStyle: React.CSSProperties = {
    color: secondaryText,
    textDecoration: 'none',
    fontSize: '0.9em',
};

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle} className="mt-5">
      <div className="container">
        <div className="row">
          
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 style={titleStyle}>Level-Up Gamer 🎮</h5>
            <p style={{ fontSize: '0.9em' }}>
              Tu tienda online para subir de nivel tu experiencia de juego.
            </p>
            <p style={{ fontSize: '0.9em' }}>
              © {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>

          <div className="col-md-4 mb-4 mb-md-0">
            <h5 style={titleStyle}>Links Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={linkStyle} className="hover-link">Catálogo</a></li>
              <li><a href="#" style={linkStyle} className="hover-link">Ofertas Especiales</a></li>
              <li><a href="#" style={linkStyle} className="hover-link">Sobre Nosotros</a></li>
              <li><a href="#" style={linkStyle} className="hover-link">Contacto y Soporte</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 style={titleStyle}>Contacto</h5>
            <p style={{ fontSize: '0.9em' }}>
              Email: soporte@levelup.cl
            </p>
            <p style={{ color: neonGreen, fontSize: '0.9em' }}>
              Teléfono: +56 9 7463 5012
            </p>
            <div className="mt-3">
                <span className="me-3" style={{ color: accentBlue, fontSize: '1.5em', cursor: 'pointer' }}>📘</span>
                <span className="me-3" style={{ color: neonGreen, fontSize: '1.5em', cursor: 'pointer' }}>🐦</span>
                <span style={{ color: secondaryText, fontSize: '1.5em', cursor: 'pointer' }}>📸</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;