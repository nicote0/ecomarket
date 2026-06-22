import { formatPrecio, plateColor, inicial } from '../utils/format'

// Vista de detalle de un producto individual.
export default function ProductoDetalle({ producto, onAgregar, onVolver }) {
  const sinStock = producto.stock <= 0

  return (
    <div className="shell">
      <div style={{ padding: '32px 0 0' }}>
        <button className="btn btn--ghost btn--sm" onClick={onVolver}>
          ← Volver al catálogo
        </button>
      </div>

      <div className="detail">
        <div className="detail__plate" style={{ background: plateColor(producto.nombre) }}>
          <span>{inicial(producto.nombre)}</span>
        </div>

        <div>
          <div className="detail__cat">{producto.categoria || 'General'}</div>
          <h1 className="detail__name">{producto.nombre}</h1>
          <div className="detail__price mono">{formatPrecio(producto.precio)}</div>
          <p className="detail__desc">{producto.descripcion}</p>

          <div className={`stock-dot ${sinStock ? 'is-out' : ''}`} style={{ marginBottom: 24 }}>
            <i></i>
            {sinStock ? 'Sin stock disponible' : `${producto.stock} unidades disponibles`}
          </div>

          <div className="detail__buy">
            <button
              className="btn btn--primary"
              onClick={() => onAgregar(producto)}
              disabled={sinStock}
            >
              Agregar al carrito
            </button>
            <button className="btn btn--ghost" onClick={onVolver}>
              Seguir mirando
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
