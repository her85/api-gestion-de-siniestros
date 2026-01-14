// src/schemas/claim.schema.ts
import { z } from 'zod';
export const CreateClaimSchema = z.object({
    userId: z.string().uuid(),
    description: z.string().min(10),
    incidentDate: z.coerce.date(),
    location: z.string(),
    images: z.array(z.string().url())
});
export const UpdateStatusSchema = z.object({
    status: z.enum(['EN_REVISIÓN', 'APROBADO', 'RECHAZADO', 'PAGADO']),
    note: z.string().optional(),
    amount: z.number().positive().optional()
}).refine((data) => {
    if (data.status === 'PAGADO' && !data.amount)
        return false;
    return true;
}, { message: "Amount is required when status is PAGADO", path: ["amount"] });
//# sourceMappingURL=claim.schema.js.map