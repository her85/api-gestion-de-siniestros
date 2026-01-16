// src/middlewares/validators.ts
import { body, param, validationResult } from 'express-validator';
// Middleware para manejar errores de validación
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: 'Datos de entrada inválidos',
            details: errors.array()
        });
        return;
    }
    next();
};
// Validaciones para ID de parámetros
export const validateIdParam = [
    param('id')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido')
        .trim()
        .escape(),
    handleValidationErrors
];
// Validaciones para creación de siniestro
export const validateCreateClaim = [
    body('userId')
        .isString()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('El userId debe tener entre 1 y 100 caracteres')
        .escape(),
    body('description')
        .isString()
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('La descripción debe tener entre 10 y 2000 caracteres')
        .escape(),
    body('incidentDate')
        .isISO8601()
        .withMessage('La fecha debe ser válida (ISO8601)')
        .toDate(),
    body('location')
        .isString()
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('La ubicación debe tener entre 1 y 500 caracteres')
        .escape(),
    body('images')
        .optional()
        .isArray()
        .withMessage('Las imágenes deben ser un array'),
    body('images.*')
        .optional()
        .isURL()
        .withMessage('Cada imagen debe ser una URL válida'),
    handleValidationErrors
];
// Validaciones para actualización de estado
export const validateUpdateStatus = [
    param('id')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido')
        .trim()
        .escape(),
    body('status')
        .isString()
        .isIn(['PENDIENTE', 'EN_REVISIÓN', 'APROBADO', 'RECHAZADO', 'PAGADO'])
        .withMessage('Estado inválido')
        .trim(),
    body('amount')
        .optional()
        .isFloat({ min: 0, max: 999999999 })
        .withMessage('El monto debe ser un número positivo válido')
        .toFloat(),
    body('note')
        .optional()
        .isString()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('La nota no puede exceder 1000 caracteres')
        .escape(),
    handleValidationErrors
];
// Validaciones para query params de filtrado
export const validateQueryFilters = [
    body('status')
        .optional()
        .isIn(['PENDIENTE', 'EN_REVISIÓN', 'APROBADO', 'RECHAZADO', 'PAGADO'])
        .withMessage('Estado inválido'),
    body('date')
        .optional()
        .isISO8601()
        .withMessage('Fecha inválida')
        .toDate(),
    handleValidationErrors
];
//# sourceMappingURL=validators.js.map