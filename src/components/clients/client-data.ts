export type ClientStatus = "Active" | "Review" | "At Risk" | "Onboarding";

export type ClientPlan = "Starter" | "Professional" | "Enterprise";

export type ClientRecord = {
  name: string;
  owner: string;
  status: ClientStatus;
  plan: ClientPlan;
  projects: number;
  lastContact: string;
  contactName: string;
  contactEmail: string;
  notes: string;
};

export const clientsStorageKey = "clientsync-pro-clients";

export const owners = ["Priya Shah", "Arjun Mehta", "Maya Rao", "Daniel Lee"];

export const clientPlans: ClientPlan[] = [
  "Starter",
  "Professional",
  "Enterprise",
];

export const clientStatuses: ClientStatus[] = [
  "Active",
  "Review",
  "At Risk",
  "Onboarding",
];

export const initialClients: ClientRecord[] = [
  {
    name: "Acme Health Systems",
    owner: "Priya Shah",
    status: "Active",
    plan: "Enterprise",
    projects: 12,
    lastContact: "Today",
    contactName: "Neha Kapoor",
    contactEmail: "neha.kapoor@acmehealth.example",
    notes: "Enterprise healthcare account with active patient engagement work.",
  },
  {
    name: "RetailOps Group",
    owner: "Arjun Mehta",
    status: "Review",
    plan: "Professional",
    projects: 8,
    lastContact: "Yesterday",
    contactName: "Marcus Chen",
    contactEmail: "marcus.chen@retailops.example",
    notes: "Quarterly business review is pending before the renewal cycle.",
  },
  {
    name: "Northstar Finance",
    owner: "Maya Rao",
    status: "Active",
    plan: "Enterprise",
    projects: 15,
    lastContact: "Jun 12",
    contactName: "Ira Menon",
    contactEmail: "ira.menon@northstar.example",
    notes: "Compliance hub work is active with security review milestones.",
  },
  {
    name: "CareDesk CRM",
    owner: "Daniel Lee",
    status: "At Risk",
    plan: "Starter",
    projects: 3,
    lastContact: "Jun 10",
    contactName: "Olivia Grant",
    contactEmail: "olivia.grant@caredesk.example",
    notes: "CRM migration is blocked on source data validation from the client.",
  },
];

export function readStoredClients() {
  try {
    const storedClients = window.localStorage.getItem(clientsStorageKey);

    if (!storedClients) {
      return initialClients;
    }

    return JSON.parse(storedClients) as ClientRecord[];
  } catch {
    return initialClients;
  }
}
