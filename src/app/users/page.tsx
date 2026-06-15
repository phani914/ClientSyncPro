import Link from "next/link";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const users = [
  {
    name: "Priya Shah",
    email: "priya.shah@clientsync.pro",
    role: "Admin",
    team: "Operations",
    status: "Active",
    lastLogin: "Today, 09:42 AM",
  },
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@clientsync.pro",
    role: "Manager",
    team: "Client Success",
    status: "Active",
    lastLogin: "Yesterday, 04:18 PM",
  },
  {
    name: "Maya Rao",
    email: "maya.rao@clientsync.pro",
    role: "Analyst",
    team: "Compliance",
    status: "Pending",
    lastLogin: "Invite sent",
  },
  {
    name: "Daniel Lee",
    email: "daniel.lee@clientsync.pro",
    role: "Support",
    team: "Helpdesk",
    status: "Suspended",
    lastLogin: "Jun 08, 02:20 PM",
  },
];

const userSummary = [
  { label: "Total Users", value: "85" },
  { label: "Admins", value: "8" },
  { label: "Pending Invites", value: "5" },
  { label: "Suspended", value: "2" },
];

const permissionGroups = [
  { label: "Client Records", admins: "Full", managers: "Edit", support: "View" },
  { label: "Projects", admins: "Full", managers: "Edit", support: "View" },
  { label: "Reports", admins: "Full", managers: "View", support: "None" },
  { label: "Settings", admins: "Full", managers: "None", support: "None" },
];

export default function UsersPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="users" />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              User Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              Users
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Manage account access, user roles, team ownership, and permission
              levels across ClientSync Pro.
            </p>
          </div>

          <Link
            className="grid h-11 place-items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            href="/users/new"
          >
            Add User
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {userSummary.map((item) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={item.label}
            >
              <p className="text-sm font-semibold text-slate-500">
                {item.label}
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-normal">
                {item.value}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
              <h2 className="text-lg font-semibold tracking-normal">
                User Directory
              </h2>
              <input
                aria-label="Search users"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:max-w-xs"
                maxLength={80}
                minLength={2}
                name="userSearch"
                pattern="[A-Za-z0-9 .@'-]*"
                placeholder="Search users"
                title="Enter at least 2 letters or numbers to search users."
                type="search"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Name</th>
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">Role</th>
                    <th className="px-5 py-3 font-semibold">Team</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Last Login</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr className="transition hover:bg-slate-50" key={user.email}>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {user.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-5 py-4 text-slate-600">{user.role}</td>
                      <td className="px-5 py-4 text-slate-600">{user.team}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {user.lastLogin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Role Permissions
            </h2>

            <div className="mt-5 grid gap-3">
              {permissionGroups.map((group) => (
                <div
                  className="rounded-md border border-slate-200 p-4"
                  key={group.label}
                >
                  <p className="font-semibold text-slate-900">{group.label}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-semibold text-slate-600">
                    <span>Admin: {group.admins}</span>
                    <span>Manager: {group.managers}</span>
                    <span>Support: {group.support}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
