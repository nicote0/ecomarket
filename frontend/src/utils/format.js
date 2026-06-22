// Formateo de precios en pesos argentinos.
const fmt = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
})

export function formatPrecio(valor) {
  return fmt.format(valor ?? 0)
}

// Fecha y hora legible (ej: "22 jun 2026, 14:30").
export function formatFecha(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Color "impreso" determinístico para la lámina de cada producto.
// Misma entrada => mismo color, así el catálogo se ve estable entre recargas.
const PLATE_COLORS = ['var(--salvia)', 'var(--terracota)', 'var(--marigold)', 'var(--ink)', 'var(--salvia-dk)']

export function plateColor(seed) {
  const texto = String(seed ?? '')
  let hash = 0
  for (let i = 0; i < texto.length; i++) {
    hash = (hash * 31 + texto.charCodeAt(i)) % 100000
  }
  return PLATE_COLORS[hash % PLATE_COLORS.length]
}

// Inicial del producto para mostrar en la lámina.
export function inicial(nombre) {
  return (nombre || '?').trim().charAt(0).toUpperCase()
}
