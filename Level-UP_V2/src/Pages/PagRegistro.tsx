import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/AuthService';
import { validateRut, validateEmail, validatePassword } from '../Utils/validations';

const PagRegistro: React.FC = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rut: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validateEmail(formData.username)) {
            setError("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }
        if (!validateRut(formData.rut)) {
            setError("El RUT ingresado no es válido.");
            return;
        }
        if (!validatePassword(formData.password)) {
            setError("La contraseña debe tener entre 4 y 10 caracteres.");
            return;
        }

        try {
            await register(formData);
            setSuccess("Usuario registrado con éxito. Redirigiendo al login...");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.error || "Error al registrar usuario");
            } else {
                setError("Error de conexión con el servidor");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Registro Level-Up</h2>
                            
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        name="username" 
                                        className="form-control" 
                                        placeholder="usuario@duoc.cl"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required 
                                    />
                                    <small className="text-muted">Solo dominios duoc.cl o gmail.com</small>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">RUT (sin puntos ni guion)</label>
                                    <input 
                                        type="text" 
                                        name="rut" 
                                        className="form-control" 
                                        placeholder="12345678K"
                                        value={formData.rut}
                                        onChange={handleChange}
                                        maxLength={9}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        value={formData.password}
                                        onChange={handleChange}
                                        required 
                                    />
                                    <small className="text-muted">Entre 4 y 10 caracteres</small>
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Registrarse</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagRegistro;