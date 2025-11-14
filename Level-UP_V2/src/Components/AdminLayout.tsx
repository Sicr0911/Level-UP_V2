import React from 'react';

export type AdminView = 
    'dashboard' | 
    'ordenes' | 
    'productosList' | 
    'usuarios' | 
    'reportes' | 
    'perfilAdmin' |
    'categoriasAdmin' |
    'nuevoProducto' |
    'editarProducto';

interface AdminLayoutProps {
    currentView: AdminView;
    onViewChange: (view: AdminView) => void;
    children: React.ReactNode;
}

const primaryColor = '#000000';
const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF'; 
const secondaryText = '#D3D3D3'; 
const headerFont = 'Orbitron, sans-serif';

const sidebarStyle: React.CSSProperties = {
    backgroundColor: '#111',
    borderRight: `1px solid ${neonGreen}`,
    color: mainText,
    minHeight: '100vh',
    padding: '20px',
};

const navItemStyle: React.CSSProperties = {
    color: secondaryText,
    padding: '10px 15px',
    margin: '5px 0',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
};

const navItems: { label: string; view: AdminView; icon: string }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: '🏠' },
    { label: 'Órdenes / Boletas', view: 'ordenes', icon: '📦' },
    { label: 'Productos (CRUD)', view: 'productosList', icon: '🕹️' },
    { label: 'Categorías', view: 'categoriasAdmin', icon: '🏷️' },
    { label: 'Usuarios', view: 'usuarios', icon: '👥' },
    { label: 'Reportes', view: 'reportes', icon: '📊' },
    { label: 'Perfil (Admin)', view: 'perfilAdmin', icon: '⚙️' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ currentView, onViewChange, children }) => {

    const getActiveStyle = (view: AdminView): React.CSSProperties => {
        if (currentView === view) {
            return {
                backgroundColor: accentBlue,
                color: mainText,
                fontWeight: 'bold',
            };
        }
        return {};
    };

    return (
        <div className="container-fluid p-0" style={{ backgroundColor: primaryColor }}>
            <header className="py-3 px-4 shadow-sm" style={{ borderBottom: `2px solid ${accentBlue}`, color: mainText }}>
                <h1 style={{ fontFamily: headerFont, fontSize: '1.5em', color: neonGreen, margin: 0 }}>
                    ADMIN PANEL | Level-Up Gamer
                </h1>
            </header>

            <div className="row g-0">
                <div className="col-md-3" style={sidebarStyle}>
                    <h5 style={{ color: accentBlue, fontFamily: headerFont, marginBottom: '20px' }}>Menú Administrativo</h5>
                    <ul className="list-unstyled">
                        {navItems.map(item => (
                            <li 
                                key={item.view}
                                style={{ ...navItemStyle, ...getActiveStyle(item.view) }}
                                onClick={() => onViewChange(item.view)}
                            >
                                {item.icon} {item.label}
                            </li>
                        ))}
                    </ul>
                    <hr style={{ borderColor: secondaryText }}/>
                    <button 
                        className="btn btn-sm w-100 mt-2" 
                        style={{ backgroundColor: '#FF5733', color: mainText }}
                        onClick={() => console.log('Simular Logout')}
                    >
                        Cerrar Sesión
                    </button>
                </div>

                <div className="col-md-9 p-4" style={{ color: mainText }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;