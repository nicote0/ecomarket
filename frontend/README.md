# EcoMarket — Frontend (React + Vite)

Interfaz de la plataforma EcoMarket. Consume la API REST del backend Spring Boot.

## Requisitos
- Node.js 18+
- Backend corriendo en `http://localhost:8080`

## Cómo ejecutar
```bash
npm install
npm run dev
```
Disponible en `http://localhost:5173`.

Otros scripts:
- `npm run build` — build de producción en `dist/`.
- `npm run preview` — sirve el build de producción.

## Decisiones técnicas

- **Componentes funcionales + Hooks**: se usan exclusivamente `useState` y `useEffect`.
  No hay componentes de clase.
- **Flujo de datos unidireccional**: todo el estado de la aplicación (productos,
  carrito, órdenes, vista actual) vive en `App.jsx`. Se pasa a los componentes hijos
  vía **props** y las acciones vuelven hacia arriba mediante **callbacks**.
- **Sin librería de routing**: la navegación entre vistas (catálogo, detalle, carrito,
  pedidos) se resuelve con un estado `vista`, manteniendo el flujo de datos explícito.
- **Persistencia del carrito**: se guarda el `id` del carrito en `localStorage` para
  que sobreviva a recargas. Al confirmar un pedido se descarta y se crea uno nuevo.
- **CORS**: el backend habilita `@CrossOrigin(origins = "*")`, por eso el frontend
  (puerto 5173) puede llamar a la API (puerto 8080) sin proxy.

## Estructura

```
src/
├── api/api.js            Llamadas fetch a todos los endpoints de la API
├── utils/format.js       Formato de precios/fechas y helpers visuales
├── App.jsx               Estado global y orquestación (useState/useEffect)
├── styles.css            Sistema de diseño (estética "mercado editorial")
└── components/
    ├── Ticker.jsx         Cinta superior animada
    ├── Header.jsx         Navegación entre vistas
    ├── Catalogo.jsx       Grilla + filtro por categoría
    ├── ProductoCard.jsx   Tarjeta de producto
    ├── ProductoDetalle.jsx Vista de detalle individual
    ├── ProductoForm.jsx   Modal de alta/edición (gestión)
    ├── Carrito.jsx        Ítems + resumen + confirmación
    ├── Pedidos.jsx        Historial de órdenes
    └── Toasts.jsx         Notificaciones
```

## Funcionalidades cubiertas (Alcance del TP)

- **Productos**: listar, ver detalle, crear, editar y eliminar (modo "Gestión").
- **Carrito**: agregar desde el catálogo, ver contenido con total, modificar
  cantidad y eliminar ítems.
- **Pedidos**: confirmar el carrito como orden con mensaje opcional; ver el
  historial de órdenes con fecha/hora y total.
