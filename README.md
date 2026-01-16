# API de Gestión de Siniestros 🚀

API REST para la gestión de siniestros de seguros, desarrollada con Node.js, Express, TypeScript y Prisma ORM.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Documentación API](#-documentación-api)
- [Endpoints](#-endpoints)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Seguridad](#-seguridad)
- [Deployment](#-deployment)

## ✨ Características

- ✅ **Clean Architecture** - Separación de responsabilidades (Controllers, Services, Repositories)
- ✅ **TypeScript** - Tipado estático para mayor seguridad
- ✅ **Prisma ORM** - ORM moderno con migraciones y type-safety
- ✅ **Validación robusta** - Zod schemas + Express-validator
- ✅ **Rate Limiting** - Protección contra ataques de fuerza bruta
- ✅ **Sanitización de inputs** - Prevención de XSS y SQL Injection
- ✅ **Helmet.js** - Cabeceras de seguridad HTTP
- ✅ **CORS configurado** - Control de origen de peticiones
- ✅ **Error handling centralizado** - Manejo consistente de errores
- ✅ **Swagger/OpenAPI** - Documentación interactiva de la API
- ✅ **Event-driven architecture** - Sistema de eventos para operaciones críticas

## 🛠 Tecnologías

- **Runtime**: Node.js v18+
- **Framework**: Express 5.x
- **Lenguaje**: TypeScript 5.x
- **ORM**: Prisma 7.x
- **Base de datos**: SQLite (desarrollo) / LibSQL (producción)
- **Validación**: Zod + Express-validator
- **Documentación**: Swagger UI + Swagger JSDoc
- **Seguridad**: Helmet, CORS, Rate Limiting

## 📦 Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd api-gestion-de-siniestros
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="file:./dev.db"

# CORS
CORS_ORIGIN=http://localhost:9000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Configurar la base de datos

```bash
# Generar cliente de Prisma
npx prisma generate

# Crear/actualizar la base de datos
npx prisma db push

# (Opcional) Poblar con datos de prueba
npm run seed
```

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `DATABASE_URL` | URL de conexión a la BD | `file:./dev.db` |
| `CORS_ORIGIN` | Origen permitido para CORS | `http://localhost:9000` |
| `RATE_LIMIT_WINDOW_MS` | Ventana de tiempo para rate limiting | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de peticiones en la ventana | `100` |

### Base de Datos

El proyecto usa Prisma con SQLite en desarrollo. Para producción, se recomienda usar LibSQL o PostgreSQL.

**Migraciones:**
```bash
# Crear migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy
```

## 🎯 Uso

### Desarrollo

```bash
# Iniciar servidor en modo desarrollo (con hot reload)
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Producción

```bash
# Compilar TypeScript
npm run build

# Iniciar servidor
npm start
```

## 📚 Documentación API

Una vez el servidor esté corriendo, accede a la documentación interactiva:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **OpenAPI JSON**: [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

La documentación de Swagger permite:
- Ver todos los endpoints disponibles
- Entender los esquemas de datos
- Probar los endpoints directamente desde el navegador
- Ver ejemplos de requests y responses

## 🔌 Endpoints

### Claims (Siniestros)

| Método | Endpoint | Descripción | Rate Limit |
|--------|----------|-------------|------------|
| `POST` | `/api/claims` | Crear nuevo siniestro | 10/hora |
| `GET` | `/api/claims` | Listar todos los siniestros | General |
| `GET` | `/api/claims/:id` | Obtener siniestro por ID | General |
| `PATCH` | `/api/claims/:id/status` | Actualizar estado | 30/15min |

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/health` | Verificar estado del servicio |

### Ejemplos de Uso

#### Crear un siniestro

```bash
POST http://localhost:3000/api/claims
Content-Type: application/json

{
  "policyNumber": "POL-2026-12345",
  "insuredName": "Juan Pérez",
  "incidentDate": "2026-01-14T10:30:00Z",
  "description": "Colisión vehicular en la Av. Principal con daños en la parte frontal",
  "claimAmount": 5000.50
}
```

#### Obtener todos los siniestros

```bash
GET http://localhost:3000/api/claims
```

#### Actualizar estado

```bash
PATCH http://localhost:3000/api/claims/{id}/status
Content-Type: application/json

{
  "status": "IN_REVIEW"
}
```

### Estados Permitidos

- `PENDING` - Pendiente
- `IN_REVIEW` - En revisión
- `APPROVED` - Aprobado
- `REJECTED` - Rechazado
- `CLOSED` - Cerrado

## 📁 Estructura del Proyecto

```
api-gestion-de-siniestros/
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   └── seed.ts                # Datos de prueba
├── src/
│   ├── config/
│   │   ├── database.ts        # Configuración de Prisma
│   │   └── swagger.ts         # Configuración de Swagger/OpenAPI
│   ├── controllers/
│   │   └── claim.controller.ts # Controladores HTTP
│   ├── events/
│   │   └── claimEvents.ts     # Event emitters
│   ├── interfaces/
│   │   └── claim.interface.ts # Tipos TypeScript
│   ├── middlewares/
│   │   ├── errorHandler.ts    # Manejo de errores global
│   │   ├── rateLimiter.ts     # Configuración de rate limiting
│   │   ├── sanitizer.ts       # Sanitización de inputs
│   │   └── validators.ts      # Validaciones con express-validator
│   ├── repositories/
│   │   └── claim.repository.ts # Capa de acceso a datos
│   ├── routes/
│   │   └── claim.routes.ts    # Definición de rutas
│   ├── schemas/
│   │   └── claim.schema.ts    # Esquemas Zod
│   ├── services/
│   │   └── claim.service.ts   # Lógica de negocio
│   ├── app.ts                 # Configuración de Express
│   └── server.ts              # Punto de entrada
├── .env                       # Variables de entorno
├── package.json
├── tsconfig.json
├── SECURITY.md                # Documentación de seguridad
└── README.md
```

### Arquitectura

El proyecto sigue el patrón **Clean Architecture**:

1. **Controllers** - Manejan las peticiones HTTP
2. **Services** - Contienen la lógica de negocio
3. **Repositories** - Acceso a datos (abstracción de Prisma)
4. **Interfaces** - Contratos TypeScript
5. **Middlewares** - Validaciones, seguridad, error handling

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor con hot-reload

# Producción
npm run build        # Compila TypeScript a JavaScript
npm start            # Inicia el servidor en producción

# Base de datos
npm run seed         # Puebla la BD con datos de prueba

# Prisma
npx prisma studio    # Abre interfaz gráfica de la BD
npx prisma generate  # Genera cliente de Prisma
npx prisma db push   # Sincroniza esquema con la BD
```

## 🔒 Seguridad

La API implementa múltiples capas de seguridad. Ver [SECURITY.md](./SECURITY.md) para detalles completos.

### Resumen de Medidas

- ✅ **Rate Limiting** - Límites por IP y endpoint
- ✅ **Helmet.js** - Cabeceras HTTP seguras
- ✅ **Input Validation** - Zod + Express-validator
- ✅ **Input Sanitization** - Prevención de XSS
- ✅ **CORS** - Control de orígenes
- ✅ **Payload Limits** - Máximo 10MB
- ✅ **UUID Validation** - IDs seguros
- ✅ **Error Handling** - Sin exposición de detalles internos

### Recomendaciones para Producción

1. **Cambiar CORS_ORIGIN** al dominio real del frontend
2. **Usar HTTPS** (obligatorio)
3. **Variables de entorno seguras** (no commitear `.env`)
4. **Base de datos robusta** (PostgreSQL/LibSQL)
5. **Logs centralizados** (Winston, Pino)
6. **Monitoreo** (New Relic, Datadog, etc.)
7. **Autenticación/Autorización** (JWT, OAuth2)

## 🚢 Deployment

### Render (Recomendado)

1. Conectar repositorio a Render
2. Configurar variables de entorno
3. Deploy automático en cada push

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build
docker build -t api-siniestros .

# Run
docker run -p 3000:3000 --env-file .env api-siniestros
```

### Variables de Entorno en Producción

Asegúrate de configurar:
- `NODE_ENV=production`
- `PORT` (si el proveedor lo requiere)
- `DATABASE_URL` (conexión a BD de producción)
- `CORS_ORIGIN` (dominio del frontend)

## 📄 Licencia

ISC

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para preguntas o problemas:
- Abre un issue en GitHub
- Email: dev@gestion-siniestros.com

---

Desarrollado con ❤️ usando Node.js, TypeScript y Prisma
