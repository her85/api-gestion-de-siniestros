// src/events/claimEvents.ts
import { EventEmitter } from 'events';

export const claimEvents = new EventEmitter();

claimEvents.on('claimStatusChanged', ({ id, status, email }) => {
  console.log(`[Event] Claim ${id} changed to ${status}. Sending email to ${email}...`);
  // Aquí iría la integración con SendGrid o Amazon SES
});