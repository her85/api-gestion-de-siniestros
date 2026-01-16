import { ClaimStatus } from '../interfaces/claim.interface.js';
import { claimEvents } from "../events/claimEvents.js";
// src/services/claim.service.ts
export class ClaimService {
    claimRepository;
    constructor(claimRepository) {
        this.claimRepository = claimRepository;
    }
    async generateClaimNumber() {
        const year = new Date().getFullYear();
        const count = await this.claimRepository.count();
        const number = String(count + 1).padStart(4, '0');
        return `SIN-${year}-${number}`;
    }
    async create(data) {
        // Generar número de siniestro
        const claimNumber = await this.generateClaimNumber();
        const claim = await this.claimRepository.create(data, claimNumber);
        // Emitir evento de creación
        claimEvents.emit('claimCreated', claim);
        return claim;
    }
    async getAll(filters) {
        return await this.claimRepository.findAll(filters);
    }
    async getById(id) {
        const claim = await this.claimRepository.findById(id);
        if (!claim) {
            throw new Error(`Claim with id ${id} not found`);
        }
        return claim;
    }
    async updateStatus(id, newStatus, amount) {
        const claim = await this.claimRepository.findById(id);
        if (!claim) {
            throw new Error(`Claim with id ${id} not found`);
        }
        // Lógica de Máquina de Estados
        const allowedTransitions = {
            [ClaimStatus.PENDIENTE]: [ClaimStatus.EN_REVISIÓN],
            [ClaimStatus.EN_REVISIÓN]: [ClaimStatus.APROBADO, ClaimStatus.RECHAZADO],
            [ClaimStatus.APROBADO]: [ClaimStatus.PAGADO],
            [ClaimStatus.RECHAZADO]: [],
            [ClaimStatus.PAGADO]: []
        };
        if (!allowedTransitions[claim.status]?.includes(newStatus)) {
            throw new Error(`Invalid transition from ${claim.status} to ${newStatus}`);
        }
        const updateData = { status: newStatus };
        if (amount !== undefined) {
            updateData.amount = amount;
        }
        const updatedClaim = await this.claimRepository.update(id, updateData);
        // Emitir evento
        claimEvents.emit('claimStatusChanged', { id, status: newStatus });
        return updatedClaim;
    }
}
//# sourceMappingURL=claim.service.js.map