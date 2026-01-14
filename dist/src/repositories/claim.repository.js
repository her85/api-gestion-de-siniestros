import { prisma } from '../config/database.js';
export class ClaimRepository {
    async count() {
        return prisma.claim.count();
    }
    async create(data, claimNumber) {
        return prisma.claim.create({
            data: {
                claimNumber,
                userId: data.userId,
                description: data.description,
                incidentDate: data.incidentDate,
                location: data.location,
                images: {
                    create: data.images.map((url) => ({ url }))
                }
            },
            include: { images: true }
        });
    }
    async findById(id) {
        return prisma.claim.findUnique({
            where: { id },
            include: { images: true }
        });
    }
    async findAll(filters) {
        return prisma.claim.findMany({
            where: {
                ...(filters.status && { status: filters.status }),
                ...(filters.date && { incidentDate: { gte: filters.date } })
            },
            include: { images: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async update(id, data) {
        return prisma.claim.update({
            where: { id },
            data,
            include: { images: true }
        });
    }
}
//# sourceMappingURL=claim.repository.js.map