import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavBarProps {
    cartItemCount: number;
    user: any;
    onLogout: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ cartItemCount, user, onLogout }) => {
    const navigate = useNavigate();
    
    const isAdmin = user?.username?.includes('admin') || user?.roles?.includes('ROLE_ADMIN'); 

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img 
                        src="/IMG/logoLevelUp.png" 
                        alt="Level-Up" 
                        height="40" 
                        className="me-2"
                        style={{ filter: 'drop-shadow(0px 0px 5px #00d2ff)' }}
                    />
                    <span className="fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                        Level-Up <span className="text-primary">Gamer</span>
                    </span>
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalogo">Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                        
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link text-warning fw-bold" to="/admin">
                                    ⚙️ Administrar
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        
                        <Link to="/carrito" className="btn btn-outline-light position-relative border-0">
                            🛒
                            {cartItemCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="dropdown">
                                <button 
                                    className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2" 
                                    type="button" 
                                    data-bs-toggle="dropdown"
                                >
                                    👤 {user.username.split('@')[0]}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                                    <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                                    <li><Link className="dropdown-item" to="/checkout">Mis Compras</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={onLogout}>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login" className="btn btn-outline-primary">Ingresar</Link>
                                <Link to="/registro" className="btn btn-primary">Registrarse</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;