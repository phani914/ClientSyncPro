import Link from "next/link";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const teams = ["Operations", "Client Success", "Compliance", "Helpdesk"];
const permissions = [
  "Manage client records",
  "Edit project details",
  "View compliance reports",
  "Invite team members",
];

export default function NewUserPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="users" />

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Link
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
            href="/users"
          >
            Back to Users
          </Link>

          <div className="mt-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              User Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              Add User
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Create a user profile, assign a role, and choose initial access
              permissions.
            </p>
          </div>
        </section>

        <form className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Profile Details
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Full Name
                </span>
                <input
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="name"
                  type="text"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Email Address
                </span>
                <input
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="email"
                  type="email"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Role
                  </span>
                  <select
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    name="role"
                  >
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Analyst</option>
                    <option>Support</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Team
                  </span>
                  <select
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    name="team"
                  >
                    {teams.map((team) => (
                      <option key={team}>{team}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Access Controls
            </h2>

            <div className="mt-6 grid gap-4">
              {permissions.map((permission) => (
                <label
                  className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700"
                  key={permission}
                >
                  <input
                    className="size-4 rounded border-slate-300 accent-slate-950"
                    type="checkbox"
                  />
                  {permission}
                </label>
              ))}
            </div>

            <label className="mt-6 flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input
                className="size-4 rounded border-slate-300 accent-slate-950"
                defaultChecked
                type="checkbox"
              />
              Send invitation email
            </label>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                className="h-12 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                type="button"
              >
                Create User
              </button>
              <Link
                className="grid h-12 place-items-center rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                href="/users"
              >
                Cancel
              </Link>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}
