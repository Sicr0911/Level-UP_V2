import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

const PagLogin: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = await login(credentials.username, credentials.password);

            navigate('/');
            window.location.reload();
        } catch (err) {
            setError("Credenciales incorrectas. Intenta nuevamente.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                                <h3 className="fw-bold">Level-Up Gamer</h3>
                                <p className="text-muted">Inicia sesión para continuar</p>
                            </div>

                            {error && <div className="alert alert-danger text-center">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        name="username" 
                                        className="form-control" 
                                        placeholder="ej: admin@duoc.cl"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Contraseña</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Ingresar
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <a href="/registro" className="text-decoration-none">¿No tienes cuenta? Regístrate aquí</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagLogin;