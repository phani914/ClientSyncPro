import Link from "next/link";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const clients = [
  "Acme Health Systems",
  "RetailOps Group",
  "Northstar Finance",
  "CareDesk CRM",
];

const owners = ["Priya Shah", "Arjun Mehta", "Maya Rao", "Daniel Lee"];

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="projects" />

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Link
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
            href="/projects"
          >
            Back to Projects
          </Link>

          <div className="mt-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              Project Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              New Project
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Create a project record, assign delivery ownership, and capture the
              initial schedule.
            </p>
          </div>
        </section>

        <form className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Project Details
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Project Name
                </span>
                <input
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="name"
                  type="text"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Client
                  </span>
                  <select
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    name="client"
                  >
                    {clients.map((client) => (
                      <option key={client}>{client}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Owner
                  </span>
                  <select
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    name="owner"
                  >
                    {owners.map((owner) => (
                      <option key={owner}>{owner}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Scope Summary
                </span>
                <textarea
                  className="min-h-32 rounded-md border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="scope"
                />
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Schedule & Health
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Start Date
                </span>
                <input
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="startDate"
                  type="date"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Due Date
                </span>
                <input
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="dueDate"
                  type="date"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Initial Status
                </span>
                <select
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="status"
                >
                  <option>On Track</option>
                  <option>At Risk</option>
                  <option>Blocked</option>
                  <option>Client Review</option>
                </select>
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                className="h-12 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                type="button"
              >
                Create Project
              </button>
              <Link
                className="grid h-12 place-items-center rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                href="/projects"
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
