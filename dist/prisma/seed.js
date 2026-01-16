// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
});
function generateClaimNumber(index) {
    const year = new Date().getFullYear();
    const number = String(index).padStart(4, '0');
    return `SIN-${year}-${number}`;
}
async function main() {
    console.log('🌱 Iniciando seed de la base de datos...');
    // Limpiar datos existentes
    await prisma.image.deleteMany();
    await prisma.claim.deleteMany();
    console.log('🗑️  Base de datos limpiada');
    // Datos de ejemplo para siniestros
    const claimsData = [
        {
            userId: 'user-001',
            description: 'Accidente de tráfico en la Avenida Principal. Colisión trasera a baja velocidad. Daños en el paragolpes y luces traseras.',
            incidentDate: new Date('2026-01-10T14:30:00'),
            location: 'Avenida Córdoba esquina Av. Callao, Buenos Aires, CABA',
            status: 'PENDIENTE',
            amount: null,
            notes: null
        },
        {
            userId: 'user-002',
            description: 'Robo de vehículo en estacionamiento. Se forzó la cerradura del lado del conductor. Vidrio lateral roto.',
            incidentDate: new Date('2026-01-08T22:15:00'),
            location: 'Shopping Alto Rosario, Estacionamiento Subsuelo 2, Rosario, Santa Fe',
            status: 'EN_REVISIÓN',
            amount: null,
            notes: 'Se ha solicitado reporte policial'
        },
        {
            userId: 'user-001',
            description: 'Daños por granizada en el techo y capó del vehículo. Múltiples abolladuras de tamaño pequeño a mediano.',
            incidentDate: new Date('2026-01-05T17:00:00'),
            location: 'Barrio Cerro de las Rosas, Córdoba Capital, Córdoba',
            status: 'APROBADO',
            amount: 1500.00,
            notes: 'Aprobado para reparación en taller autorizado'
        },
        {
            userId: 'user-003',
            description: 'Inundación por lluvia intensa en garaje subterráneo. Daños en el sistema eléctrico del vehículo.',
            incidentDate: new Date('2026-01-03T08:30:00'),
            location: 'Torre Renoir, Av. Libertador 2200, Vicente López, Buenos Aires',
            status: 'RECHAZADO',
            amount: null,
            notes: 'Rechazado: El garaje no cuenta con cobertura de inundación según póliza'
        },
        {
            userId: 'user-002',
            description: 'Accidente con ciclista. Daños menores en el espejo retrovisor derecho y rasguños en la puerta.',
            incidentDate: new Date('2025-12-28T11:45:00'),
            location: 'Avenida del Libertador altura 5800, Palermo, CABA',
            status: 'PAGADO',
            amount: 450.00,
            notes: 'Siniestro pagado. Reparación completada el 2026-01-12'
        },
        {
            userId: 'user-004',
            description: 'Daños por vandalismo. Rayones profundos en la pintura del lado izquierdo del vehículo.',
            incidentDate: new Date('2025-12-25T23:00:00'),
            location: 'Calle San Martín 458, Mendoza Capital, Mendoza',
            status: 'APROBADO',
            amount: 890.00,
            notes: 'Aprobado para repintado completo del lateral'
        },
        {
            userId: 'user-005',
            description: 'Choque en estacionamiento privado. Golpe al retroceder contra columna. Daños en parachoques trasero.',
            incidentDate: new Date('2025-12-20T19:30:00'),
            location: 'Edificio Torre Catalinas, Estacionamiento Piso 2, Puerto Madero, CABA',
            status: 'EN_REVISIÓN',
            amount: null,
            notes: null
        },
        {
            userId: 'user-003',
            description: 'Impacto con animal (jabalí) en ruta. Daños en parrilla frontal y capó.',
            incidentDate: new Date('2025-12-15T06:15:00'),
            location: 'Ruta Nacional 9, km 685, Entre Tucumán y Salta',
            status: 'PENDIENTE',
            amount: null,
            notes: null
        }
    ];
    // Crear siniestros
    for (let i = 0; i < claimsData.length; i++) {
        const claimData = claimsData[i];
        if (!claimData)
            continue;
        const claim = await prisma.claim.create({
            data: {
                claimNumber: generateClaimNumber(i + 1),
                userId: claimData.userId,
                description: claimData.description,
                incidentDate: claimData.incidentDate,
                location: claimData.location,
                status: claimData.status,
                amount: claimData.amount,
                notes: claimData.notes
            }
        });
        console.log(`✅ Siniestro creado: ${claim.claimNumber} - ${claim.status}`);
    }
    console.log(`\n🎉 Seed completado! ${claimsData.length} siniestros creados.`);
}
main()
    .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map