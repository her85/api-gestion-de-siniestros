export interface IClaim {
    id: string;
    userId: string;
    description: string;
    incidentDate: Date;
    location: string;
    images: string[];
    status: ClaimStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateClaimDTO {
    userId: string;
    description: string;
    incidentDate: Date;
    location: string;
    images: string[];
}
export declare enum ClaimStatus {
    PENDIENTE = "PENDIENTE",
    EN_REVISIÓN = "EN_REVISI\u00D3N",
    APROBADO = "APROBADO",
    RECHAZADO = "RECHAZADO",
    PAGADO = "PAGADO"
}
//# sourceMappingURL=claim.interface.d.ts.map