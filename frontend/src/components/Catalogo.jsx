import { useState } from 'react'
import ProductoCard from './ProductoCard'

// Vista de catálogo: encabezado editorial + filtro por categoría + grilla.
// El filtro de categoría es estado local de esta vista (useState).
export default function Catalogo({
  productos,
  modoGestion,
  onAgregar,
  onVerDetalle,
  onEditar,
  onEliminar,
  onNuevoProducto,
}) {
  const [categoria, setCategoria] = useState('Todas')

  // Categorías únicas derivadas de los productos.
  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria).filter(Boolean))]

  const visibles =
    categoria === 'Todas' ? productos : productos.filter((p) => p.categoria === categoria)

  return (
    <>
      <section className="hero shell">
        <div className="hero__kicker">Catálogo 2026 · Edición de temporada</div>
        <h1 className="hero__title">
          Lo que la tierra <em>da</em>, sin dejar huella.
        </h1>
        <p className="hero__sub">
          Productos ecológicos y sostenibles, seleccionados a mano. Sin plástico de un solo uso,
          con comercio justo y envases que vuelven a empezar.
        </p>
        <div className="hero__meta">
          <b>{productos.length}</b>
          productos
          <br />
          en góndola
        </div>
      </section>

      <div className="shell">
        <div className="toolbar">
          <div className="filters">
            {categorias.map((c) => (
              <button
                key={c}
                className={`chip ${categoria === c ? 'chip--active' : ''}`}
                onClick={() => setCategoria(c)}
              >
                {c}
              </button>
            ))}
          </div>
          {modoGestion && (
            <button className="btn btn--solid" onClick={onNuevoProducto}>
              + Nuevo producto
            </button>
          )}
        </div>

        {visibles.length === 0 ? (
          <div className="empty">
            <div className="empty__mark">∅</div>
            <h3>No hay productos en esta categoría</h3>
            <p>Probá con otra categoría o cargá un producto nuevo desde Gestión.</p>
          </div>
        ) : (
          <div className="grid">
            {visibles.map((producto, i) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                index={i}
                modoGestion={modoGestion}
                onAgregar={onAgregar}
                onVerDetalle={onVerDetalle}
                onEditar={onEditar}
                onEliminar={onEliminar}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
