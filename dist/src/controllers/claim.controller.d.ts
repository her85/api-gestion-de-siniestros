import type { Request, Response, NextFunction } from 'express';
import { ClaimService } from '../services/claim.service.js';
export declare class ClaimController {
    private claimService;
    constructor(claimService: ClaimService);
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=claim.controller.d.ts.map