export type ReportCategory =
  | "Client Success"
  | "Projects"
  | "Compliance"
  | "Support";

export type ReportCadence = "Daily" | "Weekly" | "Monthly" | "On Demand";

export type ReportStatus = "Published" | "Scheduled" | "Draft";

export type ReportFormat = "PDF" | "XLSX" | "CSV";

export type ReportRecord = {
  name: string;
  category: ReportCategory;
  owner: string;
  cadence: ReportCadence;
  status: ReportStatus;
  updated: string;
  format: ReportFormat;
  description: string;
  dataSources: string[];
  recipients: number;
};

export const reportsStorageKey = "clientsync-pro-reports";
export const reportExportsStorageKey = "clientsync-pro-report-exports";

export const reportCategories: ReportCategory[] = [
  "Client Success",
  "Projects",
  "Compliance",
  "Support",
];

export const reportOwners = [
  "Priya Shah",
  "Arjun Mehta",
  "Maya Rao",
  "Daniel Lee",
];

export const reportCadences: ReportCadence[] = [
  "Daily",
  "Weekly",
  "Monthly",
  "On Demand",
];

export const reportStatuses: ReportStatus[] = [
  "Published",
  "Scheduled",
  "Draft",
];

export const reportFormats: ReportFormat[] = ["PDF", "XLSX", "CSV"];

export const reportDataSources = [
  "Client records",
  "Project health",
  "Compliance alerts",
  "Support tickets",
];

export const initialReports: ReportRecord[] = [
  {
    name: "Client Health Overview",
    category: "Client Success",
    owner: "Priya Shah",
    cadence: "Weekly",
    status: "Published",
    updated: "Today",
    format: "PDF",
    description: "Account health, renewals, ownership, and engagement signals.",
    dataSources: ["Client records", "Project health"],
    recipients: 12,
  },
  {
    name: "Project Delivery Risk",
    category: "Projects",
    owner: "Arjun Mehta",
    cadence: "Daily",
    status: "Scheduled",
    updated: "Yesterday",
    format: "XLSX",
    description: "Delivery risk, blocked work, overdue milestones, and trends.",
    dataSources: ["Project health", "Support tickets"],
    recipients: 8,
  },
  {
    name: "Compliance Exceptions",
    category: "Compliance",
    owner: "Maya Rao",
    cadence: "Monthly",
    status: "Draft",
    updated: "Jun 12",
    format: "PDF",
    description: "Open compliance exceptions and audit evidence gaps.",
    dataSources: ["Compliance alerts"],
    recipients: 6,
  },
  {
    name: "Support Response Trends",
    category: "Support",
    owner: "Daniel Lee",
    cadence: "Weekly",
    status: "Published",
    updated: "Jun 10",
    format: "CSV",
    description: "Support response times, ticket aging, and SLA performance.",
    dataSources: ["Support tickets", "Client records"],
    recipients: 10,
  },
];

export function readStoredReports() {
  try {
    const storedReports = window.localStorage.getItem(reportsStorageKey);

    if (!storedReports) {
      return initialReports;
    }

    return JSON.parse(storedReports) as ReportRecord[];
  } catch {
    return initialReports;
  }
}

export function readExportCount() {
  try {
    return Number(window.localStorage.getItem(reportExportsStorageKey) ?? 132);
  } catch {
    return 132;
  }
}
