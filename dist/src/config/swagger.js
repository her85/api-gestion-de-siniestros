// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import {} from 'express';
import swaggerUi from 'swagger-ui-express';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Siniestros',
            version: '1.0.0',
            description: 'API REST para la gestión de siniestros con Express y Prisma',
            contact: {
                name: 'Equipo de Desarrollo',
                email: 'dev@gestion-siniestros.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            },
            {
                url: 'https://api-production.com',
                description: 'Servidor de producción'
            }
        ],
        tags: [
            {
                name: 'Claims',
                description: 'Operaciones relacionadas con siniestros'
            },
            {
                name: 'Health',
                description: 'Health check del servicio'
            }
        ],
        components: {
            schemas: {
                Claim: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'ID único del siniestro',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        claimNumber: {
                            type: 'string',
                            description: 'Número de siniestro',
                            example: 'SIN-2026-00001'
                        },
                        policyNumber: {
                            type: 'string',
                            description: 'Número de póliza',
                            example: 'POL-2026-12345'
                        },
                        insuredName: {
                            type: 'string',
                            description: 'Nombre del asegurado',
                            example: 'Juan Pérez'
                        },
                        incidentDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha del incidente',
                            example: '2026-01-14T10:30:00Z'
                        },
                        reportDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de reporte',
                            example: '2026-01-14T14:00:00Z'
                        },
                        description: {
                            type: 'string',
                            description: 'Descripción del siniestro',
                            example: 'Colisión vehicular en la Av. Principal'
                        },
                        claimAmount: {
                            type: 'number',
                            format: 'float',
                            description: 'Monto reclamado',
                            example: 5000.50
                        },
                        status: {
                            type: 'string',
                            enum: ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'CLOSED'],
                            description: 'Estado del siniestro',
                            example: 'PENDING'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación del registro'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización'
                        }
                    }
                },
                CreateClaimInput: {
                    type: 'object',
                    required: ['policyNumber', 'insuredName', 'incidentDate', 'description', 'claimAmount'],
                    properties: {
                        policyNumber: {
                            type: 'string',
                            description: 'Número de póliza',
                            example: 'POL-2026-12345'
                        },
                        insuredName: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 200,
                            description: 'Nombre del asegurado',
                            example: 'Juan Pérez'
                        },
                        incidentDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha del incidente (ISO 8601)',
                            example: '2026-01-14T10:30:00Z'
                        },
                        description: {
                            type: 'string',
                            minLength: 10,
                            description: 'Descripción detallada del siniestro',
                            example: 'Colisión vehicular en la Av. Principal con daños en la parte frontal'
                        },
                        claimAmount: {
                            type: 'number',
                            format: 'float',
                            minimum: 0.01,
                            description: 'Monto reclamado (debe ser mayor a 0)',
                            example: 5000.50
                        }
                    }
                },
                UpdateStatusInput: {
                    type: 'object',
                    required: ['status'],
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'CLOSED'],
                            description: 'Nuevo estado del siniestro',
                            example: 'IN_REVIEW'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Mensaje de error',
                            example: 'Error al procesar la solicitud'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field: {
                                        type: 'string',
                                        example: 'claimAmount'
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'El monto debe ser mayor a 0'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                BadRequest: {
                    description: 'Solicitud inválida',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                NotFound: {
                    description: 'Recurso no encontrado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                InternalError: {
                    description: 'Error interno del servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                TooManyRequests: {
                    description: 'Demasiadas solicitudes - rate limit excedido',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Too many requests, please try again later'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts', './src/app.ts'] // Rutas donde buscar las anotaciones JSDoc
};
const swaggerSpec = swaggerJsdoc(options);
export const setupSwagger = (app) => {
    // Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'API Gestión de Siniestros - Documentación'
    }));
    // JSON endpoint
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log('📚 Swagger docs disponible en /api-docs');
};
export default swaggerSpec;
//# sourceMappingURL=swagger.js.map