import { useState, useEffect } from 'react'
import { productosApi, carritoApi, ordenesApi } from './api/api'
import Ticker from './components/Ticker'
import Header from './components/Header'
import Catalogo from './components/Catalogo'
import ProductoDetalle from './components/ProductoDetalle'
import ProductoForm from './components/ProductoForm'
import Carrito from './components/Carrito'
import Pedidos from './components/Pedidos'
import Toasts from './components/Toasts'

const CARRITO_KEY = 'ecomarket_carrito_id'

export default function App() {
  // ---- Estado global de la aplicación ----
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState(null) // { id, items: [] }
  const [ordenes, setOrdenes] = useState([])

  const [vista, setVista] = useState('catalogo') // catalogo | detalle | carrito | pedidos
  const [productoDetalle, setProductoDetalle] = useState(null)
  const [modoGestion, setModoGestion] = useState(false)
  const [form, setForm] = useState({ abierto: false, producto: null }) // modal alta/edición

  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [confirmando, setConfirmando] = useState(false)
  const [toasts, setToasts] = useState([])

  // ---- Notificaciones ----
  const toast = (texto, tipo = 'ok') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, texto, tipo }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200)
  }

  // ---- Carga inicial: productos, órdenes y carrito guardado ----
  useEffect(() => {
    async function cargar() {
      try {
        const [prods, ords] = await Promise.all([productosApi.listar(), ordenesApi.listar()])
        setProductos(prods)
        setOrdenes(ords)

        // Recuperar carrito previo si existe en localStorage
        const guardado = localStorage.getItem(CARRITO_KEY)
        if (guardado) {
          try {
            const c = await carritoApi.obtener(guardado)
            setCarrito(c)
          } catch {
            localStorage.removeItem(CARRITO_KEY) // el carrito ya no existe en el backend
          }
        }
      } catch (err) {
        setErrorCarga(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  // Garantiza que exista un carrito en el backend; devuelve su id.
  const asegurarCarrito = async () => {
    if (carrito) return carrito
    const nuevo = await carritoApi.crear()
    setCarrito(nuevo)
    localStorage.setItem(CARRITO_KEY, nuevo.id)
    return nuevo
  }

  // ---- Acciones de carrito ----
  const agregarAlCarrito = async (producto, cantidad = 1) => {
    try {
      const c = await asegurarCarrito()
      const actualizado = await carritoApi.agregarItem(c.id, producto.id, cantidad)
      setCarrito(actualizado)
      toast(`${producto.nombre} agregado al carrito`)
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const modificarCantidad = async (item, nuevaCantidad) => {
    try {
      if (nuevaCantidad < 1) {
        const actualizado = await carritoApi.eliminarItem(carrito.id, item.id)
        setCarrito(actualizado)
        return
      }
      const actualizado = await carritoApi.modificarItem(carrito.id, item.id, nuevaCantidad)
      setCarrito(actualizado)
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const eliminarItem = async (item) => {
    try {
      const actualizado = await carritoApi.eliminarItem(carrito.id, item.id)
      setCarrito(actualizado)
      toast('Ítem eliminado del carrito')
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  const confirmarPedido = async (mensaje) => {
    if (!carrito) return
    setConfirmando(true)
    try {
      await ordenesApi.confirmar(carrito.id, mensaje)
      // Refrescamos el historial y empezamos un carrito nuevo y vacío.
      const ords = await ordenesApi.listar()
      setOrdenes(ords)
      localStorage.removeItem(CARRITO_KEY)
      setCarrito(null)
      setVista('pedidos')
      toast('¡Pedido confirmado! Gracias por tu compra ✦')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setConfirmando(false)
    }
  }

  // ---- Acciones de productos (gestión) ----
  const guardarProducto = async (datos) => {
    // Se lanza el error hacia el formulario para que lo muestre inline.
    if (form.producto) {
      await productosApi.actualizar(form.producto.id, datos)
      toast('Producto actualizado')
    } else {
      await productosApi.crear(datos)
      toast('Producto creado')
    }
    const prods = await productosApi.listar()
    setProductos(prods)
    setForm({ abierto: false, producto: null })
  }

  const eliminarProducto = async (producto) => {
    if (!window.confirm(`¿Eliminar "${producto.nombre}" del catálogo?`)) return
    try {
      await productosApi.eliminar(producto.id)
      setProductos((prev) => prev.filter((p) => p.id !== producto.id))
      toast('Producto eliminado')
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  // ---- Navegación ----
  const navegar = (v) => {
    setVista(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const verDetalle = (producto) => {
    setProductoDetalle(producto)
    navegar('detalle')
  }

  const cantidadCarrito = carrito?.items?.reduce((acc, it) => acc + it.cantidad, 0) || 0

  // ---- Render ----
  return (
    <>
      <Ticker />
      <Header
        vista={vista}
        onNavegar={navegar}
        cantidadCarrito={cantidadCarrito}
        modoGestion={modoGestion}
        onToggleGestion={() => setModoGestion((m) => !m)}
      />

      <main>
        {cargando ? (
          <div className="loader">
            <div className="loader__dots">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <span>Cargando el mercado…</span>
          </div>
        ) : errorCarga ? (
          <div className="shell">
            <div className="empty" style={{ marginTop: 60 }}>
              <div className="empty__mark">⚠</div>
              <h3>No pudimos conectar con el servidor</h3>
              <p>
                {errorCarga}. Verificá que el backend esté corriendo en{' '}
                <span className="mono">http://localhost:8080</span>.
              </p>
              <button className="btn btn--primary" onClick={() => window.location.reload()}>
                Reintentar
              </button>
            </div>
          </div>
        ) : (
          <>
            {vista === 'catalogo' && (
              <Catalogo
                productos={productos}
                modoGestion={modoGestion}
                onAgregar={agregarAlCarrito}
                onVerDetalle={verDetalle}
                onEditar={(p) => setForm({ abierto: true, producto: p })}
                onEliminar={eliminarProducto}
                onNuevoProducto={() => setForm({ abierto: true, producto: null })}
              />
            )}

            {vista === 'detalle' && productoDetalle && (
              <ProductoDetalle
                producto={productoDetalle}
                onAgregar={agregarAlCarrito}
                onVolver={() => navegar('catalogo')}
              />
            )}

            {vista === 'carrito' && (
              <Carrito
                items={carrito?.items || []}
                onModificarCantidad={modificarCantidad}
                onEliminarItem={eliminarItem}
                onConfirmar={confirmarPedido}
                onIrCatalogo={() => navegar('catalogo')}
                confirmando={confirmando}
              />
            )}

            {vista === 'pedidos' && (
              <Pedidos ordenes={ordenes} onIrCatalogo={() => navegar('catalogo')} />
            )}
          </>
        )}
      </main>

      <footer className="footer">
        EcoMarket · Comercio electrónico sostenible · Hecho con <b>♥</b> para INF243
      </footer>

      {form.abierto && (
        <ProductoForm
          producto={form.producto}
          onGuardar={guardarProducto}
          onCancelar={() => setForm({ abierto: false, producto: null })}
        />
      )}

      <Toasts toasts={toasts} />
    </>
  )
}
