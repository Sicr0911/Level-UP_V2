import React from 'react';

export type View = 'catalogo' | 'carrito' | 'registro' | 'perfil' | 'home' | 'ofertas' | 'nosotros' | 'blog' | 'contacto' | 'categorias';

interface NavbarProps {
    currentView: View;
    onViewChange: (view: View) => void;
    cartItemCount: number;
}

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14'; 
const mainText = '#FFFFFF'; 

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, cartItemCount }) => {
    
    const navItems: { label: string; view: View; isAccent?: boolean; }[] = [
        { label: 'Home', view: 'home' },
        { label: 'Categorías', view: 'categorias' },
        { label: 'Ofertas', view: 'ofertas' },
        { label: 'Nosotros', view: 'nosotros' },
        { label: 'Blog', view: 'blog' },
        { label: 'Contacto', view: 'contacto' },
        { label: `🛒 Carrito (${cartItemCount})`, view: 'carrito', isAccent: true },
        { label: '👤 Registro', view: 'registro', isAccent: true },
        { label: '👤 Perfil', view: 'perfil', isAccent: true },
    ];

    const getButtonStyle = (view: View, isAccent?: boolean): React.CSSProperties => ({
        backgroundColor: currentView === view ? (isAccent ? neonGreen : accentBlue) : 'transparent',
        color: currentView === view && isAccent ? primaryColor : mainText,
        fontWeight: 'bold',
        borderColor: isAccent ? neonGreen : accentBlue,
        border: '1px solid',
        transition: 'background-color 0.25s',
    });

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: primaryColor, borderBottom: `2px solid ${neonGreen}` }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#" onClick={() => onViewChange('home')} style={{ fontFamily: 'Orbitron, sans-serif', color: accentBlue, fontSize: '1.5rem' }}>
                    Level-Up Gamer
                </a>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup" 
                    aria-controls="navbarNavAltMarkup" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    style={{ filter: 'invert(1) hue-rotate(180deg)', border: `1px solid ${mainText}` }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navItems.filter(item => !item.isAccent).map(item => (
                            <a 
                                key={item.view}
                                className="nav-link"
                                href="#"
                                onClick={() => onViewChange(item.view)}
                                style={{ color: currentView === item.view ? neonGreen : mainText }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="d-flex flex-column flex-lg-row gap-2">
                         {navItems.filter(item => item.isAccent).map(item => (
                            <button 
                                key={item.view}
                                onClick={() => onViewChange(item.view)} 
                                className="btn btn-sm"
                                style={getButtonStyle(item.view, item.isAccent)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;