// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import claimRoutes from './routes/claim.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
dotenv.config();
const app = express();
// Middlewares base
app.use(cors());
app.use(express.json());
// Rutas de la API
app.use('/api/claims', claimRoutes);
// Health check para Render
app.get('/health', (req, res) => res.status(200).send('OK'));
// Global Error Handler (Debe ir al final)
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map