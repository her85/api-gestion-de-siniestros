// src/interfaces/claim.interface.ts

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

export enum ClaimStatus {
  PENDIENTE = 'PENDIENTE',
  EN_REVISIÓN = 'EN_REVISIÓN',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  PAGADO = 'PAGADO'
}