import type { CreateClaimDTO } from '../interfaces/claim.interface.js';
import { ClaimStatus } from '../interfaces/claim.interface.js';
import type { ClaimRepository } from "../repositories/claim.repository.js";
import type { Claim } from '@prisma/client';
import { claimEvents } from "../events/claimEvents.js";

// src/services/claim.service.ts
export class ClaimService {
  constructor(private claimRepository: ClaimRepository) {}

  private async generateClaimNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.claimRepository.count();
    const number = String(count + 1).padStart(4, '0');
    return `SIN-${year}-${number}`;
  }

  async create(data: CreateClaimDTO): Promise<Claim> {
    // Generar número de siniestro
    const claimNumber = await this.generateClaimNumber();
    
    const claim = await this.claimRepository.create(data, claimNumber);
    
    // Emitir evento de creación
    claimEvents.emit('claimCreated', claim);
    
    return claim;
  }

  async getAll(filters: { status?: string; date?: Date }) {
    return await this.claimRepository.findAll(filters);
  }

  async getById(id: string) {
    const claim = await this.claimRepository.findById(id);
    
    if (!claim) {
      throw new Error(`Claim with id ${id} not found`);
    }
    
    return claim;
  }

  async updateStatus(id: string, newStatus: ClaimStatus, amount?: number) {
    const claim = await this.claimRepository.findById(id);
    
    if (!claim) {
      throw new Error(`Claim with id ${id} not found`);
    }
    
    // Lógica de Máquina de Estados
    const allowedTransitions: Record<ClaimStatus, ClaimStatus[]> = {
      [ClaimStatus.PENDIENTE]: [ClaimStatus.EN_REVISIÓN],
      [ClaimStatus.EN_REVISIÓN]: [ClaimStatus.APROBADO, ClaimStatus.RECHAZADO],
      [ClaimStatus.APROBADO]: [ClaimStatus.PAGADO],
      [ClaimStatus.RECHAZADO]: [],
      [ClaimStatus.PAGADO]: []
    };

    if (!allowedTransitions[claim.status as ClaimStatus]?.includes(newStatus)) {
      throw new Error(`Invalid transition from ${claim.status} to ${newStatus}`);
    }

    const updateData: { status: string; amount?: number | null } = { status: newStatus };
    if (amount !== undefined) {
      updateData.amount = amount;
    }

    const updatedClaim = await this.claimRepository.update(id, updateData);
    
    // Emitir evento
    claimEvents.emit('claimStatusChanged', { id, status: newStatus });
    
    return updatedClaim;
  }
}