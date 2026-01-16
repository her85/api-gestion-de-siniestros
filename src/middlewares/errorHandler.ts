// src/middlewares/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Traducir errores de validación de Zod a 400 Bad Request
  if (err instanceof ZodError || err?.name === 'ZodError') {
    const errors = (err.errors || []).map((e: any) => ({ path: e.path.join('.'), message: e.message }));
    res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
    return;
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};