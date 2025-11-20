const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar p-3">
          <div className="sidebar-sticky">
            <h5 className="text-uppercase text-muted">Admin Panel</h5>
            <ul className="nav flex-column">
              <li className="nav-item"><a className="nav-link active" href="#">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Órdenes</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Productos</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Usuarios</a></li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard - Resumen</h1>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header">Compras</div>
                <div className="card-body">
                  <h5 className="card-title">1,234</h5>
                  <p className="card-text">Probabilidad de aumento: 20%</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">Productos</div>
                <div className="card-body">
                  <h5 className="card-title">400</h5>
                  <p className="card-text">Inventario actual: 500</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-warning mb-3">
                <div className="card-header">Usuarios</div>
                <div className="card-body">
                  <h5 className="card-title">150</h5>
                  <p className="card-text">Nuevos usuarios este mes: 10</p>
                </div>
              </div>
            </div>
          </div>

          <h2>Gestión Rápida</h2>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="card p-3 shadow-sm">
                <i className="fa fa-box fa-2x mb-2 text-primary"></i>
                <h6>Productos</h6>
                <small>Administrar inventario</small>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card p-3 shadow-sm">
                <i className="fa fa-shopping-cart fa-2x mb-2 text-success"></i>
                <h6>Órdenes</h6>
                <small>Ver últimas ventas</small>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card p-3 shadow-sm">
                <i className="fa fa-users fa-2x mb-2 text-warning"></i>
                <h6>Usuarios</h6>
                <small>Gestión de clientes</small>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card p-3 shadow-sm">
                <i className="fa fa-chart-bar fa-2x mb-2 text-info"></i>
                <h6>Reportes</h6>
                <small>Métricas del sistema</small>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;