// src/repositories/claim.repository.ts
import type { Claim } from '@prisma/client';
import type { CreateClaimDTO } from '../interfaces/claim.interface.js';
import { prisma } from '../config/database.js';

export class ClaimRepository {
  async count(): Promise<number> {
    return prisma.claim.count();
  }

  async create(data: CreateClaimDTO, claimNumber: string): Promise<Claim> {
    return prisma.claim.create({
      data: {
        claimNumber,
        userId: data.userId,
        description: data.description,
        incidentDate: data.incidentDate,
        location: data.location,
        images: {
          create: data.images.map((url: string) => ({ url }))
        }
      },
      include: { images: true }
    });
  }

  async findById(id: string): Promise<Claim | null> {
    return prisma.claim.findUnique({
      where: { id },
      include: { images: true }
    });
  }

  async findAll(filters: { status?: string; date?: Date }): Promise<Claim[]> {
    return prisma.claim.findMany({
      where: {
        ...(filters.status && { status: filters.status }),
        ...(filters.date && { incidentDate: { gte: filters.date } })
      },
      include: { images: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: string, data: Partial<Claim>): Promise<Claim> {
    return prisma.claim.update({
      where: { id },
      data,
      include: { images: true }
    });
  }
}