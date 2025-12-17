import React from 'react';

const PagBlog: React.FC = () => {
    return (
        <div className="container py-5">
            <h2 className="text-center mb-5 fw-bold text-primary">📰 Blog Gamer: Casos Curiosos</h2>
            
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">El Código Konami</h5>
                            <p className="card-text text-muted">26 de Octubre, 2023</p>
                            <p className="card-text">
                                ¿Sabías que el famoso código "Arriba, Arriba, Abajo, Abajo..." fue creado porque el desarrollador de Gradius olvidó quitar el modo de prueba antes de lanzar el juego? Se convirtió en el cheat más famoso de la historia.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Pac-Man y la Pizza</h5>
                            <p className="card-text text-muted">15 de Noviembre, 2023</p>
                            <p className="card-text">
                                La forma icónica de Pac-Man fue inspirada en una pizza a la que le faltaba una rebanada. Toru Iwatani, su creador, estaba almorzando cuando tuvo la idea millonaria.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagBlog;