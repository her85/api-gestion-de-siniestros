import { z } from 'zod';
export declare const CreateClaimSchema: z.ZodObject<{
    userId: z.ZodString;
    description: z.ZodString;
    incidentDate: z.ZodCoercedDate<unknown>;
    location: z.ZodString;
    images: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export declare const UpdateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        EN_REVISIÓN: "EN_REVISIÓN";
        APROBADO: "APROBADO";
        RECHAZADO: "RECHAZADO";
        PAGADO: "PAGADO";
    }>;
    note: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=claim.schema.d.ts.map