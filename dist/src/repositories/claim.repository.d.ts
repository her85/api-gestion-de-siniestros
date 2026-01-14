import type { Claim } from '@prisma/client';
import type { CreateClaimDTO } from '../interfaces/claim.interface.js';
export declare class ClaimRepository {
    count(): Promise<number>;
    create(data: CreateClaimDTO, claimNumber: string): Promise<Claim>;
    findById(id: string): Promise<Claim | null>;
    findAll(filters: {
        status?: string;
        date?: Date;
    }): Promise<Claim[]>;
    update(id: string, data: Partial<Claim>): Promise<Claim>;
}
//# sourceMappingURL=claim.repository.d.ts.map