# EcoMarket

Plataforma de comercio electrónico sostenible. Aplicación full‑stack desarrollada
para el TP Integrador de Taller de Construcción de Software (INF243):

- **Backend**: API REST con Spring Boot + Spring Data JPA + MySQL (carpeta raíz).
- **Frontend**: React + Vite que consume la API (carpeta [`frontend/`](frontend/)).

## Entregables
- **Informe técnico**: [`informe/Informe_EcoMarket.pdf`](informe/Informe_EcoMarket.pdf)
- **Video demo** (2:50): [`video/EcoMarket_demo.mp4`](video/EcoMarket_demo.mp4)
- **Colección Postman**: [`EcoMarket.postman_collection.json`](EcoMarket.postman_collection.json)

## Integrantes
- Rinaldi, Nicolás — 45403417
- Aguilar, Esteban — 46307516
- Cuberli, Roman — 45352533
- Bruno, Enzo Eduardo — 38410678

## Tecnologías
- Java 21
- Spring Boot 4 (Spring Web MVC + Spring Data JPA + Bean Validation)
- MySQL 8 / Hibernate
- Maven (incluye wrapper `mvnw`)

## Requisitos
- Java 21+
- MySQL 8 en ejecución
- Maven (o usar el wrapper `mvnw` incluido)

## Cómo ejecutar el backend

1. Crear la base de datos:
   ```sql
   CREATE DATABASE ecomarket_db;
   ```

2. Configurar usuario y contraseña en `src/main/resources/application.properties`.

3. Ejecutar:
   ```bash
   mvnw.cmd spring-boot:run
   ```

El servidor queda corriendo en http://localhost:8080

> Al iniciar, se cargan automáticamente 10 productos de ejemplo en el catálogo
> (ver `src/main/resources/data.sql`). La carga es idempotente: no se duplican
> en reinicios sucesivos.

## Endpoints de la API

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/api/productos` | Listar catálogo | 200 |
| GET | `/api/productos/{id}` | Ver producto | 200 / 404 |
| POST | `/api/productos` | Crear producto | 201 / 400 |
| PUT | `/api/productos/{id}` | Modificar producto | 200 / 400 / 404 |
| DELETE | `/api/productos/{id}` | Eliminar producto | 204 / 404 |
| POST | `/api/carritos` | Crear carrito | 201 |
| GET | `/api/carritos/{id}` | Ver carrito (con total) | 200 / 404 |
| POST | `/api/carritos/{id}/items` | Agregar ítem | 200 / 400 / 404 |
| PUT | `/api/carritos/{id}/items/{itemId}` | Modificar cantidad | 200 / 400 / 404 |
| DELETE | `/api/carritos/{id}/items/{itemId}` | Eliminar ítem | 200 / 404 |
| POST | `/api/ordenes/confirmar/{carritoId}` | Confirmar pedido | 201 / 400 / 404 |
| GET | `/api/ordenes` | Historial de órdenes | 200 |
| GET | `/api/ordenes/{id}` | Ver orden | 200 / 404 |

La colección de Postman con todos los endpoints está en `EcoMarket.postman_collection.json`
(usa la variable `{{baseUrl}}` = http://localhost:8080).

## Probar la API con Postman
Importar `EcoMarket.postman_collection.json`. Orden sugerido para una demo completa:
crear producto → crear carrito → agregar ítem → ver carrito → confirmar orden → ver historial.

## Cómo ejecutar el frontend (React)

Con el backend corriendo en http://localhost:8080:

```bash
cd frontend
npm install
npm run dev
```

La aplicación queda disponible en http://localhost:5173 y consume la API del backend.
Más detalles en [`frontend/README.md`](frontend/README.md).

## Levantar todo (resumen)

1. MySQL en ejecución con la base `ecomarket_db`.
2. Backend: `mvnw.cmd spring-boot:run` (puerto 8080).
3. Frontend: `cd frontend && npm install && npm run dev` (puerto 5173).
