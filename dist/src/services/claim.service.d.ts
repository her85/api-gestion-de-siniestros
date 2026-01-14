import type { CreateClaimDTO } from '../interfaces/claim.interface.js';
import { ClaimStatus } from '../interfaces/claim.interface.js';
import type { ClaimRepository } from "../repositories/claim.repository.js";
import type { Claim } from '@prisma/client';
export declare class ClaimService {
    private claimRepository;
    constructor(claimRepository: ClaimRepository);
    private generateClaimNumber;
    create(data: CreateClaimDTO): Promise<Claim>;
    getAll(filters: {
        status?: string;
        date?: Date;
    }): Promise<{
        id: string;
        claimNumber: string;
        userId: string;
        description: string;
        incidentDate: Date;
        location: string;
        status: string;
        amount: number | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        claimNumber: string;
        userId: string;
        description: string;
        incidentDate: Date;
        location: string;
        status: string;
        amount: number | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, newStatus: ClaimStatus, amount?: number): Promise<{
        id: string;
        claimNumber: string;
        userId: string;
        description: string;
        incidentDate: Date;
        location: string;
        status: string;
        amount: number | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=claim.service.d.ts.map