import { formatPrecio, formatFecha } from '../utils/format'

// Historial de órdenes confirmadas, presentadas como tickets impresos.
export default function Pedidos({ ordenes, onIrCatalogo }) {
  if (ordenes.length === 0) {
    return (
      <div className="shell">
        <div className="section-head">
          <h2>Pedidos</h2>
        </div>
        <div className="empty">
          <div className="empty__mark">❦</div>
          <h3>Todavía no hay pedidos</h3>
          <p>Cuando confirmes un carrito, vas a ver acá el historial de órdenes.</p>
          <button className="btn btn--primary" onClick={onIrCatalogo}>
            Ir al catálogo
          </button>
        </div>
      </div>
    )
  }

  // Las más recientes primero.
  const ordenadas = [...ordenes].sort((a, b) => b.id - a.id)

  return (
    <div className="shell">
      <div className="section-head">
        <h2>Pedidos</h2>
        <p>Historial de órdenes confirmadas en EcoMarket.</p>
      </div>

      <div className="orders">
        {ordenadas.map((orden) => (
          <article className="order-ticket" key={orden.id}>
            <div className="order-ticket__head">
              <div className="order-ticket__id">
                Orden <b>#{String(orden.id).padStart(4, '0')}</b>
              </div>
              <div className="order-ticket__date">{formatFecha(orden.fechaHora)}</div>
            </div>

            <div className="order-ticket__body">
              {orden.items.map((it) => (
                <div className="order-line" key={it.id}>
                  <span>
                    {it.cantidad} × {it.producto.nombre}
                  </span>
                  <span>{formatPrecio(it.producto.precio * it.cantidad)}</span>
                </div>
              ))}

              {orden.mensajeCliente && (
                <div className="order-msg">“{orden.mensajeCliente}”</div>
              )}
            </div>

            <div className="order-ticket__foot">
              <span>Total</span>
              <b>{formatPrecio(orden.total)}</b>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
