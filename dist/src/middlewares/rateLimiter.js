// src/middlewares/rateLimiter.ts
import rateLimit from 'express-rate-limit';
// Rate limiter general para todos los endpoints
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo 100 peticiones por IP
    message: 'Demasiadas peticiones desde esta IP, por favor intenta nuevamente más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});
// Rate limiter estricto para creación de siniestros
export const createClaimLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10, // Máximo 10 siniestros por hora por IP
    message: 'Has excedido el límite de creación de siniestros. Intenta más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});
// Rate limiter para actualizaciones de estado
export const updateStatusLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 30, // Máximo 30 actualizaciones por 15 minutos
    message: 'Demasiadas actualizaciones de estado. Intenta más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});
//# sourceMappingURL=rateLimiter.js.map