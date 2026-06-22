// Encabezado con navegación entre vistas.
// Recibe la vista actual y dispara callbacks hacia App (flujo unidireccional).
export default function Header({ vista, onNavegar, cantidadCarrito, modoGestion, onToggleGestion }) {
  const item = (id, etiqueta, badge) => (
    <button
      className={`nav__btn ${vista === id ? 'nav__btn--active' : ''}`}
      onClick={() => onNavegar(id)}
    >
      {etiqueta}
      {badge > 0 && <span className="nav__badge">{badge}</span>}
    </button>
  )

  return (
    <header className="header">
      <div className="header__inner">
        <div className="brand" onClick={() => onNavegar('catalogo')}>
          <div className="brand__mark">E</div>
          <div>
            <div className="brand__name">
              Eco<em>Market</em>
            </div>
            <div className="brand__tag">Mercado sostenible · est. 2026</div>
          </div>
        </div>

        <nav className="nav">
          {item('catalogo', 'Catálogo')}
          {item('carrito', 'Carrito', cantidadCarrito)}
          {item('pedidos', 'Pedidos')}
          <button
            className={`nav__btn ${modoGestion ? 'nav__btn--active' : ''}`}
            onClick={onToggleGestion}
            title="Activar gestión del catálogo (alta, edición y baja de productos)"
          >
            {modoGestion ? '● Gestión' : 'Gestión'}
          </button>
        </nav>
      </div>
    </header>
  )
}
