import { formatPrecio, plateColor, inicial } from '../utils/format'

// Tarjeta de producto del catálogo.
// Presentacional: recibe el producto y callbacks; no tiene estado propio.
export default function ProductoCard({
  producto,
  index,
  modoGestion,
  onAgregar,
  onVerDetalle,
  onEditar,
  onEliminar,
}) {
  const sinStock = producto.stock <= 0

  return (
    <article
      className="card"
      style={{ animationDelay: `${Math.min(index, 12) * 0.05}s` }}
    >
      <div className="card__plate" style={{ background: plateColor(producto.nombre) }}>
        <span>{inicial(producto.nombre)}</span>
      </div>

      <div className="card__body">
        <span className="card__cat">{producto.categoria || 'General'}</span>
        <h3 className="card__name" onClick={() => onVerDetalle(producto)}>
          {producto.nombre}
        </h3>
        <p className="card__desc">{producto.descripcion}</p>
        <div className="card__foot">
          <div className="price">{formatPrecio(producto.precio)}</div>
          <div className={`stock-dot ${sinStock ? 'is-out' : ''}`}>
            <i></i>
            {sinStock ? 'Sin stock' : `${producto.stock} disp.`}
          </div>
        </div>
      </div>

      {modoGestion ? (
        <div className="card__admin">
          <button className="btn btn--sm btn--salvia" onClick={() => onEditar(producto)}>
            Editar
          </button>
          <button className="btn btn--sm" onClick={() => onEliminar(producto)}>
            Eliminar
          </button>
        </div>
      ) : (
        <div className="card__actions">
          <button className="btn btn--sm btn--ghost" onClick={() => onVerDetalle(producto)}>
            Ver
          </button>
          <button
            className="btn btn--sm btn--primary"
            onClick={() => onAgregar(producto)}
            disabled={sinStock}
          >
            + Carrito
          </button>
        </div>
      )}
    </article>
  )
}
