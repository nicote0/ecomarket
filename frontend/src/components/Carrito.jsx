import { useState } from 'react'
import { formatPrecio, plateColor, inicial } from '../utils/format'

// Vista del carrito: lista de ítems con steppers + panel-recibo con total y confirmación.
// El total se calcula en el cliente a partir de los ítems (precio × cantidad).
export default function Carrito({
  items,
  onModificarCantidad,
  onEliminarItem,
  onConfirmar,
  onIrCatalogo,
  confirmando,
}) {
  const [mensaje, setMensaje] = useState('')

  const total = items.reduce((acc, it) => acc + it.producto.precio * it.cantidad, 0)
  const unidades = items.reduce((acc, it) => acc + it.cantidad, 0)

  if (items.length === 0) {
    return (
      <div className="shell">
        <div className="section-head">
          <h2>Tu carrito</h2>
        </div>
        <div className="empty">
          <div className="empty__mark">◍</div>
          <h3>El carrito está vacío</h3>
          <p>Sumá productos del catálogo y volvé para confirmar tu pedido.</p>
          <button className="btn btn--primary" onClick={onIrCatalogo}>
            Ir al catálogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="shell">
      <div className="section-head">
        <h2>Tu carrito</h2>
        <p>Revisá las cantidades y dejá un mensaje para tu pedido si querés.</p>
      </div>

      <div className="layout-cart">
        <div className="cart-items">
          {items.map((it) => (
            <div className="line-item" key={it.id}>
              <div className="line-item__mark" style={{ background: plateColor(it.producto.nombre) }}>
                {inicial(it.producto.nombre)}
              </div>
              <div>
                <div className="line-item__name">{it.producto.nombre}</div>
                <div className="line-item__meta">
                  {formatPrecio(it.producto.precio)} c/u · subtotal{' '}
                  {formatPrecio(it.producto.precio * it.cantidad)}
                </div>
              </div>
              <div className="line-item__right">
                <div className="stepper">
                  <button
                    onClick={() => onModificarCantidad(it, it.cantidad - 1)}
                    aria-label="Restar"
                  >
                    −
                  </button>
                  <span>{it.cantidad}</span>
                  <button
                    onClick={() => onModificarCantidad(it, it.cantidad + 1)}
                    aria-label="Sumar"
                  >
                    +
                  </button>
                </div>
                <button className="icon-btn" onClick={() => onEliminarItem(it)} title="Eliminar ítem">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="receipt">
          <h3>Resumen</h3>
          <div className="receipt__sub">EcoMarket · pedido</div>
          <hr className="receipt__rule" />

          <div className="receipt__row">
            <span>Ítems distintos</span>
            <span>{items.length}</span>
          </div>
          <div className="receipt__row">
            <span>Unidades</span>
            <span>{unidades}</span>
          </div>

          <hr className="receipt__rule" />
          <div className="receipt__total">
            <span>Total</span>
            <b>{formatPrecio(total)}</b>
          </div>

          <label>Mensaje para el pedido (opcional)</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Ej: Por favor entregar en horario de la tarde"
          />

          <button
            className="btn btn--primary"
            onClick={() => onConfirmar(mensaje)}
            disabled={confirmando}
          >
            {confirmando ? 'Confirmando…' : 'Confirmar pedido'}
          </button>
        </aside>
      </div>
    </div>
  )
}
