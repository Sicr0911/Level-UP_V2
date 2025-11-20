import React, { useState } from 'react';

const Checkout = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    comuna: '',
    region: 'Metropolitana'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const exito = Math.random() > 0.3;

    if (exito) {
      alert("Redirigiendo a: PAGO CORRECTO (Boleta generada)");
    } else {
      alert("Redirigiendo a: PAGO CON ERROR (Intente nuevamente)");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <div className="row">
        <div className="col-md-8">
          <h4 className="mb-3">Información del cliente</h4>
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">Nombre</label>
                <input 
                  type="text" className="form-control" name="nombre" 
                  value={formData.nombre} onChange={handleInputChange} required 
                />
              </div>

              <div className="col-sm-6">
                <label className="form-label">Apellidos</label>
                <input 
                  type="text" className="form-control" name="apellidos" 
                  value={formData.apellidos} onChange={handleInputChange} required 
                />
              </div>

              <div className="col-12 mt-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" className="form-control" name="correo" 
                  value={formData.correo} onChange={handleInputChange} required 
                />
              </div>

              <h4 className="mb-3 mt-4">Dirección de entrega</h4>
              
              <div className="col-12">
                <label className="form-label">Calle y Número</label>
                <input 
                  type="text" className="form-control" name="calle" placeholder="Av. Principal 123"
                  value={formData.calle} onChange={handleInputChange} required 
                />
              </div>

              <div className="col-md-5 mt-3">
                <label className="form-label">Región</label>
                <select className="form-select" name="region" value={formData.region} onChange={handleInputChange}>
                  <option value="Metropolitana">Región Metropolitana</option>
                  <option value="Valparaiso">Valparaíso</option>
                  <option value="BioBio">Biobío</option>
                </select>
              </div>

              <div className="col-md-4 mt-3">
                <label className="form-label">Comuna</label>
                <input 
                  type="text" className="form-control" name="comuna" 
                  value={formData.comuna} onChange={handleInputChange} required 
                />
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Pagar ahora
            </button>
          </form>
        </div>

        <div className="col-md-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Tu Carrito</span>
            <span className="badge bg-primary rounded-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Producto Ejemplo</h6>
                <small className="text-muted">Descripción breve</small>
              </div>
              <span className="text-muted">$12.000</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (CLP)</span>
              <strong>$12.000</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;