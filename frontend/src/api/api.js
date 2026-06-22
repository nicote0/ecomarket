// Capa de acceso a la API REST de EcoMarket (Spring Boot).
// El backend resuelve CORS con @CrossOrigin(origins = "*") en cada controlador,
// por eso el frontend (http://localhost:5173) puede llamar a http://localhost:8080.

const BASE_URL = 'http://localhost:8080/api'

// Helper central: hace fetch, valida el estado HTTP y parsea JSON.
// Lanza un Error con el mensaje del backend cuando la respuesta no es OK.
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    let mensaje = `Error ${res.status}`
    try {
      const cuerpo = await res.json()
      mensaje = cuerpo.error || cuerpo.message || mensaje
      if (cuerpo.detalles) {
        mensaje = Object.values(cuerpo.detalles).join(' · ')
      }
    } catch {
      // la respuesta puede no tener cuerpo (ej. 404/204)
    }
    throw new Error(mensaje)
  }

  // 204 No Content no tiene cuerpo
  if (res.status === 204) return null
  return res.json()
}

// ---- Productos ----
export const productosApi = {
  listar: () => request('/productos'),
  obtener: (id) => request(`/productos/${id}`),
  crear: (producto) =>
    request('/productos', { method: 'POST', body: JSON.stringify(producto) }),
  actualizar: (id, producto) =>
    request(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(producto) }),
  eliminar: (id) => request(`/productos/${id}`, { method: 'DELETE' }),
}

// ---- Carrito ----
export const carritoApi = {
  crear: () => request('/carritos', { method: 'POST' }),
  obtener: (id) => request(`/carritos/${id}`),
  agregarItem: (carritoId, productoId, cantidad) =>
    request(`/carritos/${carritoId}/items`, {
      method: 'POST',
      body: JSON.stringify({ productoId, cantidad }),
    }),
  modificarItem: (carritoId, itemId, cantidad) =>
    request(`/carritos/${carritoId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ cantidad }),
    }),
  eliminarItem: (carritoId, itemId) =>
    request(`/carritos/${carritoId}/items/${itemId}`, { method: 'DELETE' }),
}

// ---- Órdenes ----
export const ordenesApi = {
  confirmar: (carritoId, mensaje) =>
    request(`/ordenes/confirmar/${carritoId}`, {
      method: 'POST',
      body: JSON.stringify({ mensaje }),
    }),
  listar: () => request('/ordenes'),
  obtener: (id) => request(`/ordenes/${id}`),
}
