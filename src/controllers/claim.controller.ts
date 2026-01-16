// src/controllers/claim.controller.ts
import type { Request, Response, NextFunction } from 'express';
import { ClaimService } from '../services/claim.service.js';
import { CreateClaimSchema } from '../schemas/claim.schema.js';

export class ClaimController {
  constructor(private claimService: ClaimService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = CreateClaimSchema.parse(req.body);
      const claim = await this.claimService.create(validatedData);
      res.status(201).json(claim);
    } catch (error) {
      next(error); // El Global Error Handler captura esto
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, date } = req.query;
      const filters: { status?: string; date?: Date } = {};
      
      if (status && typeof status === 'string') {
        filters.status = status;
      }
      if (date && typeof date === 'string') {
        filters.date = new Date(date);
      }
      
      const claims = await this.claimService.getAll(filters);
      res.status(200).json(claims);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      
      const claim = await this.claimService.getById(id);
      res.status(200).json(claim);
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      
      const { status, amount } = req.body;
      const updatedClaim = await this.claimService.updateStatus(id, status, amount);
      res.status(200).json(updatedClaim);
    } catch (error) {
      next(error);
    }
  };
}