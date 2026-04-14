// src/events/claimEvents.ts
import { EventEmitter } from 'events';

export const claimEvents = new EventEmitter();

claimEvents.on('claimStatusChanged', ({ id, status, email }) => {
  console.log(`[Event] Claim ${id} changed to ${status}. Sending email to ${email}...`);
  // Integracion con servicio de email (simulado)
});