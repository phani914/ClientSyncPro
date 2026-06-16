export type ProjectStatus =
  | "On Track"
  | "At Risk"
  | "Blocked"
  | "Client Review";

export type ProjectRecord = {
  name: string;
  client: string;
  owner: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  startDate: string;
  scope: string;
};

export type MilestoneStatus = "Done" | "Upcoming" | "At Risk" | "Planned";

export type Milestone = {
  name: string;
  date: string;
  status: MilestoneStatus;
};

export const projectsStorageKey = "clientsync-pro-projects";

export const clients = [
  "Acme Health Systems",
  "RetailOps Group",
  "Northstar Finance",
  "CareDesk CRM",
];

export const owners = ["Priya Shah", "Arjun Mehta", "Maya Rao", "Daniel Lee"];

export const projectStatuses: ProjectStatus[] = [
  "On Track",
  "At Risk",
  "Blocked",
  "Client Review",
];

export const initialProjects: ProjectRecord[] = [
  {
    name: "RetailOps Portal",
    client: "RetailOps Group",
    owner: "Arjun Mehta",
    status: "Client Review",
    progress: 82,
    dueDate: "Jun 28",
    startDate: "2026-05-12",
    scope: "Customer portal modernization and workflow automation.",
  },
  {
    name: "CareDesk CRM Migration",
    client: "CareDesk CRM",
    owner: "Daniel Lee",
    status: "Blocked",
    progress: 38,
    dueDate: "Jul 05",
    startDate: "2026-05-28",
    scope: "Migrate account history and support operations into the new CRM.",
  },
  {
    name: "Northstar Compliance Hub",
    client: "Northstar Finance",
    owner: "Maya Rao",
    status: "On Track",
    progress: 64,
    dueDate: "Jul 18",
    startDate: "2026-06-03",
    scope: "Compliance dashboard, alerts, and audit evidence workflow.",
  },
  {
    name: "Acme Patient Connect",
    client: "Acme Health Systems",
    owner: "Priya Shah",
    status: "At Risk",
    progress: 51,
    dueDate: "Jul 24",
    startDate: "2026-06-05",
    scope: "Patient engagement portal and appointment communication tools.",
  },
];

export const initialMilestones: Milestone[] = [
  { name: "Discovery complete", date: "Jun 18", status: "Done" },
  { name: "Prototype approval", date: "Jun 25", status: "Upcoming" },
  { name: "Security review", date: "Jul 02", status: "At Risk" },
  { name: "Production launch", date: "Jul 19", status: "Planned" },
];

export function formatProjectDate(value: string) {
  if (!value) {
    return "Not set";
  }

  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(date);
}
