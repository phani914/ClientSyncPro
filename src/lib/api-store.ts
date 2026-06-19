import { initialClients, type ClientRecord } from "@/components/clients/client-data";
import {
  initialProjects,
  type ProjectRecord,
} from "@/components/projects/project-data";
import {
  initialReports,
  type ReportRecord,
} from "@/components/reports/report-data";
import { initialUsers, type UserRecord } from "@/components/users/user-data";

type ApiState = {
  clients: ClientRecord[];
  projects: ProjectRecord[];
  reports: ReportRecord[];
  reportExports: number;
  users: UserRecord[];
};

const globalStore = globalThis as typeof globalThis & {
  clientSyncApiState?: ApiState;
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getApiState() {
  if (!globalStore.clientSyncApiState) {
    globalStore.clientSyncApiState = {
      clients: clone(initialClients),
      projects: clone(initialProjects),
      reports: clone(initialReports),
      reportExports: 132,
      users: clone(initialUsers),
    };
  }

  return globalStore.clientSyncApiState;
}

export function findByName<T extends { name: string }>(items: T[], name: string) {
  return items.find((item) => item.name.toLowerCase() === name.toLowerCase());
}

export function findByEmail<T extends { email: string }>(
  items: T[],
  email: string,
) {
  return items.find((item) => item.email.toLowerCase() === email.toLowerCase());
}
