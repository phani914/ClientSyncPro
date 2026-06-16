export type UserStatus = "Active" | "Pending" | "Suspended";

export type UserRole = "Admin" | "Manager" | "Analyst" | "Support";

export type UserTeam =
  | "Operations"
  | "Client Success"
  | "Compliance"
  | "Helpdesk";

export type UserRecord = {
  name: string;
  email: string;
  role: UserRole;
  team: UserTeam;
  status: UserStatus;
  lastLogin: string;
  permissions: string[];
  inviteSent: boolean;
};

export const usersStorageKey = "clientsync-pro-users";

export const teams: UserTeam[] = [
  "Operations",
  "Client Success",
  "Compliance",
  "Helpdesk",
];

export const roles: UserRole[] = ["Admin", "Manager", "Analyst", "Support"];

export const permissions = [
  "Manage client records",
  "Edit project details",
  "View compliance reports",
  "Invite team members",
];

export const initialUsers: UserRecord[] = [
  {
    name: "Priya Shah",
    email: "priya.shah@clientsync.pro",
    role: "Admin",
    team: "Operations",
    status: "Active",
    lastLogin: "Today, 09:42 AM",
    permissions,
    inviteSent: true,
  },
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@clientsync.pro",
    role: "Manager",
    team: "Client Success",
    status: "Active",
    lastLogin: "Yesterday, 04:18 PM",
    permissions: ["Manage client records", "Edit project details"],
    inviteSent: true,
  },
  {
    name: "Maya Rao",
    email: "maya.rao@clientsync.pro",
    role: "Analyst",
    team: "Compliance",
    status: "Pending",
    lastLogin: "Invite sent",
    permissions: ["View compliance reports"],
    inviteSent: true,
  },
  {
    name: "Daniel Lee",
    email: "daniel.lee@clientsync.pro",
    role: "Support",
    team: "Helpdesk",
    status: "Suspended",
    lastLogin: "Jun 08, 02:20 PM",
    permissions: [],
    inviteSent: false,
  },
];

export const permissionGroups = [
  { label: "Client Records", admins: "Full", managers: "Edit", support: "View" },
  { label: "Projects", admins: "Full", managers: "Edit", support: "View" },
  { label: "Reports", admins: "Full", managers: "View", support: "None" },
  { label: "Settings", admins: "Full", managers: "None", support: "None" },
];
