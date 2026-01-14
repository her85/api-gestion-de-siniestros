// src/routes/claim.routes.ts
import { Router } from 'express';
import { ClaimController } from '../controllers/claim.controller.js';
import { ClaimService } from '../services/claim.service.js';
import { ClaimRepository } from '../repositories/claim.repository.js';
import { createClaimLimiter, updateStatusLimiter } from '../middlewares/rateLimiter.js';
import { validateCreateClaim, validateUpdateStatus, validateIdParam } from '../middlewares/validators.js';
const router = Router();
// Inyección de dependencias manual (Clean Architecture)
const claimRepository = new ClaimRepository();
const claimService = new ClaimService(claimRepository);
const claimController = new ClaimController(claimService);
/**
 * @swagger
 * /api/claims:
 *   post:
 *     summary: Crear un nuevo siniestro
 *     tags: [Claims]
 *     description: Crea un nuevo registro de siniestro en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClaimInput'
 *     responses:
 *       201:
 *         description: Siniestro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Claim'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/', createClaimLimiter, validateCreateClaim, claimController.create);
/**
 * @swagger
 * /api/claims:
 *   get:
 *     summary: Obtener todos los siniestros
 *     tags: [Claims]
 *     description: Recupera la lista completa de siniestros registrados
 *     responses:
 *       200:
 *         description: Lista de siniestros recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Claim'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', claimController.getAll);
/**
 * @swagger
 * /api/claims/{id}:
 *   get:
 *     summary: Obtener un siniestro por ID
 *     tags: [Claims]
 *     description: Recupera la información detallada de un siniestro específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del siniestro
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Siniestro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Claim'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/:id', validateIdParam, claimController.getById);
/**
 * @swagger
 * /api/claims/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de un siniestro
 *     tags: [Claims]
 *     description: Modifica el estado de un siniestro existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del siniestro
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatusInput'
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Claim'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.patch('/:id/status', updateStatusLimiter, validateUpdateStatus, claimController.updateStatus);
export default router;
//# sourceMappingURL=claim.routes.js.map