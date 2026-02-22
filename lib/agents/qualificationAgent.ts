import { Lead } from "./intakeAgent";

export function qualificationAgent(lead: Lead): Lead | null {
  // simple qualification rule
  if (!lead.email.includes("@")) {
    return null;
  }

  return lead;
}