import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

export type View =
    'catalogo' |
    'carrito' |
    'registro' |
    'perfil' |
    'home' |
    'ofertas' |
    'nosotros' |
    'blog' |
    'contacto' |
    'categorias' |
    'detalleProducto' |
    'checkout' |
    'pagoExito' |
    'pagoError' |
    'adminPanel';

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
    
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState<string | null>(null);

    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            setIsLoggedIn(true);
            setLoggedUser(localStorage.getItem('username'));
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Intentando login con:", usuario);

        const success = await AuthService.login({
            username: usuario,
            password: password
        });

        if (success) {
            alert("¡Bienvenido " + usuario + "!");
            setIsLoggedIn(true);
            setLoggedUser(usuario);
            setUsuario('');
            setPassword('');
            window.location.reload(); 
        } else {
            alert("Error: Usuario o contraseña incorrectos");
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        setLoggedUser(null);
        alert("Sesión cerrada");
        onViewChange('home');
    };

    const navItems = [
        { label: 'Home', view: 'home' },
        { label: 'Categorías', view: 'categorias' },
        { label: 'Ofertas', view: 'ofertas' },
        { label: `🛒 Carrito (${cartItemCount})`, view: 'carrito', isAccent: true },
        ...(isLoggedIn ? [{ label: 'Admin Panel', view: 'adminPanel', isAccent: true }] : []),
        ...(isLoggedIn ? [{ label: '👤 Perfil', view: 'perfil', isAccent: true }] : []),
    ];

    const getButtonStyle = (view: string, isAccent?: boolean): React.CSSProperties => ({
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
                                onClick={() => onViewChange(item.view as View)}
                                style={{ color: currentView === item.view ? neonGreen : mainText }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="d-flex flex-column flex-lg-row gap-2 align-items-center">
                        {navItems.filter(item => item.isAccent).map(item => (
                            <button
                                key={item.view}
                                onClick={() => onViewChange(item.view as View)}
                                className="btn btn-sm"
                                style={getButtonStyle(item.view, item.isAccent)}
                            >
                                {item.label}
                            </button>
                        ))}

                        {!isLoggedIn ? (
                            <form className="d-flex gap-2" onSubmit={handleLogin}>
                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="Usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    style={{ width: '120px' }}
                                />
                                <input
                                    className="form-control form-control-sm"
                                    type="password"
                                    placeholder="Pass"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ width: '120px' }}
                                />
                                <button className="btn btn-outline-success btn-sm" type="submit">Login</button>
                                <button 
                                    className="btn btn-outline-light btn-sm" 
                                    type="button" 
                                    onClick={() => onViewChange('registro')}
                                >
                                    Registro
                                </button>
                            </form>
                        ) : (
                            <div className="d-flex align-items-center gap-2 text-white ms-2">
                                <small>Hola, {loggedUser}</small>
                                <button 
                                    className="btn btn-outline-danger btn-sm" 
                                    onClick={handleLogout}
                                >
                                    Salir
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;