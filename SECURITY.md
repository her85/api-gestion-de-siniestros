# Seguridad del API - Sistema de Gestión de Siniestros

## 🛡️ Medidas de Seguridad Implementadas

### 1. **Rate Limiting (Limitación de Peticiones)**
Previene ataques de fuerza bruta y DDoS:

- **General**: 100 peticiones por IP cada 15 minutos
- **Crear Siniestro**: 10 siniestros por hora por IP
- **Actualizar Estado**: 30 actualizaciones cada 15 minutos

### 2. **Helmet.js**
Configura cabeceras HTTP de seguridad:
- Content Security Policy (CSP)
- X-Frame-Options (previene clickjacking)
- X-Content-Type-Options
- Strict-Transport-Security (HSTS)

### 3. **Validación y Sanitización de Inputs**

#### Validaciones con Zod y Express-Validator:
- **userId**: Máximo 100 caracteres
- **description**: Entre 10 y 2000 caracteres
- **location**: Máximo 500 caracteres
- **incidentDate**: No puede ser fecha futura
- **images**: Máximo 10 URLs válidas
- **amount**: Número positivo, máximo 999,999,999
- **status**: Solo valores permitidos del enum

#### Sanitización contra XSS:
- Eliminación de etiquetas `<script>`
- Filtrado de `javascript:` protocol
- Eliminación de event handlers (`onclick`, etc.)

### 4. **Límite de Payload**
- JSON y URL-encoded limitados a 10MB
- Previene ataques por tamaño de datos

### 5. **Validación de UUIDs**
- Todos los IDs son validados como UUID v4
- Previene inyección SQL y manipulación de IDs

### 6. **CORS Configurado**
- Solo permite peticiones desde `http://localhost:9000`
- Actualizar para producción con el dominio real

## 📝 Configuración para Producción

### Variables de entorno recomendadas:
```env
# .env
NODE_ENV=production
DATABASE_URL=file:./prod.db
ALLOWED_ORIGINS=https://tu-dominio.com
PORT=3000
```

### Actualizar CORS en producción:
```typescript
app.use(cors({ 
  origin: process.env.ALLOWED_ORIGINS || 'http://localhost:9000',
  credentials: true 
}))
```

## 🔒 Buenas Prácticas Adicionales (Recomendadas)

1. **Agregar autenticación JWT** para proteger endpoints
2. **Implementar logging** con Winston o Morgan
3. **Usar HTTPS** en producción (Render lo hace automáticamente)
4. **Agregar tests de seguridad** con OWASP ZAP
5. **Monitoreo de errores** con Sentry

## 🚀 Testing de Seguridad

Probar rate limiting:
```bash
# Hacer 101 peticiones rápidas (debería bloquear después de 100)
for i in {1..101}; do curl http://localhost:3000/api/claims; done
```

Probar validaciones:
```bash
# Intentar crear siniestro con datos inválidos
curl -X POST http://localhost:3000/api/claims \
  -H "Content-Type: application/json" \
  -d '{"userId":"","description":"abc"}'
```
