import React from 'react';
import { getAllProducts } from '../Data/Productos';

const accentBlue = '#1E90FF';
const neonGreen = '#39FF14';
const mainText = '#FFFFFF'; 
const headerFont = 'Orbitron, sans-serif';

const getMetrics = () => {
    const allProducts = getAllProducts();
    const totalProducts = allProducts.length;
    
    const totalSales = 1234;
    const totalUsers = 890; 
    
    const inventoryValue = allProducts.reduce((sum, p) => sum + p.precio, 0);

    return {
        totalSales,
        totalProducts,
        totalUsers,
        inventoryValue
    };
};

const formatMetricValue = (value: number) => {
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
    }
    return value.toLocaleString('es-CL');
};

interface MetricCardProps {
    title: string;
    value: string | number;
    color: string;
    detail: string;
    icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, color, detail, icon }) => {
    const cardStyle: React.CSSProperties = {
        backgroundColor: color,
        color: mainText,
        borderRadius: '8px',
        padding: '20px',
        boxShadow: `0 0 10px ${color}`,
        fontFamily: headerFont,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '150px'
    };

    return (
        <div style={cardStyle}>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="fs-6 m-0" style={{ opacity: 0.8 }}>{title}</h3>
                <span style={{ fontSize: '2em' }}>{icon}</span>
            </div>
            <h2 className="fs-1 m-0">{value}</h2>
            <small style={{ opacity: 0.7 }}>{detail}</small>
        </div>
    );
};

const PagAdminDashboard: React.FC = () => {
    const metrics = getMetrics();

    return (
        <div className="p-0">
            <h2 style={{ color: neonGreen, fontFamily: headerFont, marginBottom: '30px' }}>Dashboard | Resumen de Actividad</h2>
            
            <div className="row g-4 mb-5">
                
                <div className="col-lg-4 col-md-6">
                    <MetricCard 
                        title="Ventas Totales (Unidades)"
                        value={metrics.totalSales.toLocaleString('es-CL')}
                        color={accentBlue}
                        detail="Incremento del 20% vs mes anterior"
                        icon="🛒"
                    />
                </div>

                <div className="col-lg-4 col-md-6">
                    <MetricCard 
                        title="Inventario Activo"
                        value={metrics.totalProducts.toLocaleString('es-CL')}
                        color={neonGreen}
                        detail={`Valor total: ${formatMetricValue(metrics.inventoryValue)} en inventario`}
                        icon="📦"
                    />
                </div>

                <div className="col-lg-4 col-md-6">
                    <MetricCard 
                        title="Usuarios Registrados"
                        value={metrics.totalUsers.toLocaleString('es-CL')}
                        color="#FFC107" 
                        detail="890 usuarios en el sistema"
                        icon="👥"
                    />
                </div>
            </div>

            <h3 style={{ color: accentBlue, fontFamily: headerFont, marginBottom: '20px' }}>Accesos Rápidos</h3>
            <div className="row g-4">
                
                <div className="col-md-4">
                    <div className="p-3 text-center" style={{ backgroundColor: '#222', border: `1px solid ${neonGreen}`, borderRadius: '8px' }}>
                        <span style={{ fontSize: '2em', color: neonGreen }}>🕹️</span>
                        <p className="m-0" style={{color: mainText}}>Gestión de Productos (CRUD)</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-3 text-center" style={{ backgroundColor: '#222', border: `1px solid ${accentBlue}`, borderRadius: '8px' }}>
                        <span style={{ fontSize: '2em', color: accentBlue }}>📉</span>
                        <p className="m-0" style={{color: mainText}}>Generar Reportes Detallados</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default PagAdminDashboard;