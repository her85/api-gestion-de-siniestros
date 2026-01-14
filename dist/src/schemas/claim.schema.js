// src/schemas/claim.schema.ts
import { z } from 'zod';
export const CreateClaimSchema = z.object({
    userId: z.string()
        .min(1, "userId is required")
        .max(100, "userId no puede exceder 100 caracteres")
        .trim(),
    description: z.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(2000, "La descripción no puede exceder 2000 caracteres")
        .trim(),
    incidentDate: z.coerce.date()
        .refine(date => date <= new Date(), {
        message: "La fecha del incidente no puede ser futura"
    }),
    location: z.string()
        .min(1, "La ubicación es requerida")
        .max(500, "La ubicación no puede exceder 500 caracteres")
        .trim(),
    images: z.array(z.string().url("URL de imagen inválida"))
        .max(10, "Máximo 10 imágenes permitidas")
        .optional()
        .default([])
});
export const UpdateStatusSchema = z.object({
    status: z.enum(['EN_REVISIÓN', 'APROBADO', 'RECHAZADO', 'PAGADO'], {
        message: "Estado inválido"
    }),
    note: z.string()
        .max(1000, "La nota no puede exceder 1000 caracteres")
        .trim()
        .optional(),
    amount: z.number()
        .positive("El monto debe ser positivo")
        .max(999999999, "El monto es demasiado grande")
        .optional()
}).refine((data) => {
    if (data.status === 'PAGADO' && !data.amount)
        return false;
    return true;
}, { message: "El monto es requerido cuando el estado es PAGADO", path: ["amount"] });
//# sourceMappingURL=claim.schema.js.map