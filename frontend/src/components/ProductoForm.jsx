import { useState } from 'react'

// Modal para crear o editar un producto (formulario controlado).
// Si recibe `producto`, está en modo edición; si no, en modo alta.
export default function ProductoForm({ producto, onGuardar, onCancelar }) {
  const esEdicion = Boolean(producto)

  const [form, setForm] = useState({
    nombre: producto?.nombre || '',
    descripcion: producto?.descripcion || '',
    precio: producto?.precio ?? '',
    stock: producto?.stock ?? '',
    categoria: producto?.categoria || '',
  })
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  // Validación en el cliente antes de llamar al backend (que también valida).
  const validar = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio'
    if (!form.categoria.trim()) return 'La categoría es obligatoria'
    if (form.precio === '' || Number(form.precio) <= 0) return 'El precio debe ser mayor a 0'
    if (form.stock === '' || Number(form.stock) < 0) return 'El stock no puede ser negativo'
    return ''
  }

  const enviar = async (e) => {
    e.preventDefault()
    const msg = validar()
    if (msg) {
      setError(msg)
      return
    }
    setGuardando(true)
    try {
      await onGuardar({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: Number(form.stock),
        categoria: form.categoria.trim(),
      })
    } catch (err) {
      setError(err.message)
      setGuardando(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__kicker">{esEdicion ? 'Editar producto' : 'Alta de producto'}</div>
        <h3>{esEdicion ? form.nombre || 'Producto' : 'Nuevo producto'}</h3>

        <form onSubmit={enviar} style={{ marginTop: 18 }}>
          <div className="field">
            <label>Nombre</label>
            <input value={form.nombre} onChange={cambiar('nombre')} placeholder="Ej: Jabón artesanal" />
          </div>

          <div className="field">
            <label>Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={cambiar('descripcion')}
              placeholder="Breve descripción del producto"
              rows={2}
            />
          </div>

          <div className="field field--row">
            <div>
              <label>Precio (ARS)</label>
              <input type="number" min="0" step="0.01" value={form.precio} onChange={cambiar('precio')} />
            </div>
            <div>
              <label>Stock</label>
              <input type="number" min="0" value={form.stock} onChange={cambiar('stock')} />
            </div>
          </div>

          <div className="field">
            <label>Categoría</label>
            <input value={form.categoria} onChange={cambiar('categoria')} placeholder="Ej: Higiene" />
          </div>

          {error && (
            <div className="toast toast--error" style={{ position: 'static', maxWidth: 'none' }}>
              {error}
            </div>
          )}

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onCancelar} disabled={guardando}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={guardando}>
              {guardando ? 'Guardando…' : esEdicion ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
