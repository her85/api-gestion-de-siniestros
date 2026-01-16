import type { Request, Response, NextFunction } from 'express';
export declare const handleValidationErrors: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateIdParam: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
export declare const validateCreateClaim: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
export declare const validateUpdateStatus: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
export declare const validateQueryFilters: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
//# sourceMappingURL=validators.d.ts.map