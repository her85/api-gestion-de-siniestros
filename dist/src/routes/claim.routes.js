// src/routes/claim.routes.ts
import { Router } from 'express';
import { ClaimController } from '../controllers/claim.controller.js';
import { ClaimService } from '../services/claim.service.js';
import { ClaimRepository } from '../repositories/claim.repository.js';
const router = Router();
// Inyección de dependencias manual (Clean Architecture)
const claimRepository = new ClaimRepository();
const claimService = new ClaimService(claimRepository);
const claimController = new ClaimController(claimService);
// Definición de Endpoints
router.post('/', claimController.create);
router.get('/', claimController.getAll);
router.get('/:id', claimController.getById);
router.patch('/:id/status', claimController.updateStatus);
export default router;
//# sourceMappingURL=claim.routes.js.map