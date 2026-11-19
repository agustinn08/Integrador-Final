# Venta Gamer – Tienda online Full Stack

Aplicación web completa para una tienda de videojuegos: un frontend en React y una API REST en Node.js con base de datos MongoDB. Proyecto integrador del bootcamp Full Stack (Educación IT).

## Qué permite hacer

- **Clientes:** ver el catálogo de productos, entrar al detalle de cada uno, registrarse, iniciar sesión, usar el carrito y hacer pedidos.
- **Administradores:** gestionar productos (alta, edición, baja e imagen) y usuarios desde paneles protegidos.
- **Seguridad:** autenticación con JWT, contraseñas cifradas con bcrypt y rutas protegidas por rol (`admin` / `client`).

## Tecnologías

| Parte | Tecnologías |
| --- | --- |
| Frontend | React 18, React Router 6, Context API, CSS |
| Backend | Node.js, Express, Mongoose |
| Base de datos | MongoDB Atlas |
| Autenticación | JWT, bcryptjs |
| Archivos | Multer (subida de imágenes) |

## Estructura del repositorio

```
backend/backend/            API REST (controllers, models, routes, middleware)
frontend/Integrador react/  aplicación React (components, pages, context, services)
```

## Cómo ejecutarlo

Necesitás Node.js y una base de datos en MongoDB Atlas.

### 1. Backend

```bash
cd backend/backend
npm install
```

Crear un archivo `.env` en esa carpeta:

```
MONGO_URI=tu_cadena_de_conexion_de_mongodb
JWT_SECRET=una_clave_secreta_larga
PORT=3001
```

Cargar datos de ejemplo (opcional) e iniciar:

```bash
npm run seed
node seedProducts.js
npm run dev
```

El seed crea un usuario administrador y uno cliente de prueba, con contraseña de desarrollo. No usar en producción.

### 2. Frontend

En otra terminal:

```bash
cd "frontend/Integrador react"
npm install
npm start
```

Se abre en `http://localhost:3000` y se conecta a la API en `http://localhost:3001/api`.

## Endpoints principales de la API

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | `/api/users/login` | Público |
| POST | `/api/users` | Público (registro) |
| GET | `/api/products`, `/api/products/:id` | Público |
| POST / PUT / DELETE | `/api/products` | Admin |
| GET / POST | `/api/orders` | Usuario logueado |
| GET / DELETE | `/api/users` | Admin |

## Autor

Agustín Mora · Técnico en Informática · Full Stack en formación
