import type { Request, Response, NextFunction } from 'express';
/**
 * Middleware para sanitizar entradas y prevenir ataques XSS, SQL Injection, etc.
 */
export declare const sanitizeInputs: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=sanitizer.d.ts.map