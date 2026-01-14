// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import claimRoutes from './routes/claim.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { generalLimiter } from './middlewares/rateLimiter.js';
import { sanitizeInputs } from './middlewares/sanitizer.js';
import { setupSwagger } from './config/swagger.js';

dotenv.config();

const app = express();

// Seguridad con Helmet (protege contra vulnerabilidades comunes)
app.use(helmet());

// CORS configurado para desarrollo y producción
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:9000/', 'https://otro-dominio.com'] // Agregar tus dominios de producción
    : true, // En desarrollo permite cualquier origen
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares base
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limitar tamaño de payload
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitización de inputs (prevenir XSS, SQL Injection)
app.use(sanitizeInputs);

// Rate limiting global
app.use(generalLimiter);

// Configurar Swagger (debe ir antes de las rutas)
setupSwagger(app);

// Rutas de la API
app.use('/api/claims', claimRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check del servicio
 *     tags: [Health]
 *     description: Endpoint para verificar que el servicio está funcionando correctamente
 *     responses:
 *       200:
 *         description: Servicio funcionando correctamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: OK
 */
app.get('/health', (req, res) => res.status(200).send('OK'));

// Global Error Handler (Debe ir al final)
app.use(errorHandler);

export default app;