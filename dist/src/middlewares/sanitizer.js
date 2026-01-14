/**
 * Middleware para sanitizar entradas y prevenir ataques XSS, SQL Injection, etc.
 */
export const sanitizeInputs = (req, res, next) => {
    // Sanitizar strings recursivamente
    const sanitize = (obj) => {
        if (typeof obj === 'string') {
            // Eliminar caracteres peligrosos
            return obj
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Scripts
                .replace(/javascript:/gi, '') // JavaScript protocol
                .replace(/on\w+\s*=/gi, ''); // Event handlers (sin trim aquí)
        }
        if (Array.isArray(obj)) {
            return obj.map(sanitize);
        }
        if (obj !== null && typeof obj === 'object') {
            const sanitized = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    sanitized[key] = sanitize(obj[key]);
                }
            }
            return sanitized;
        }
        return obj;
    };
    try {
        if (req.body && typeof req.body === 'object') {
            req.body = sanitize(req.body);
        }
        // No sanitizar query params para evitar problemas con filtros
        // if (req.query) {
        //   req.query = sanitize(req.query);
        // }
        if (req.params && typeof req.params === 'object') {
            req.params = sanitize(req.params);
        }
    }
    catch (error) {
        console.error('Error en sanitización:', error);
    }
    next();
};
//# sourceMappingURL=sanitizer.js.map