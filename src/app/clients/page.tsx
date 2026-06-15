import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const clients = [
  {
    name: "Acme Health Systems",
    owner: "Priya Shah",
    status: "Active",
    plan: "Enterprise",
    projects: 12,
    lastContact: "Today",
  },
  {
    name: "RetailOps Group",
    owner: "Arjun Mehta",
    status: "Review",
    plan: "Professional",
    projects: 8,
    lastContact: "Yesterday",
  },
  {
    name: "Northstar Finance",
    owner: "Maya Rao",
    status: "Active",
    plan: "Enterprise",
    projects: 15,
    lastContact: "Jun 12",
  },
  {
    name: "CareDesk CRM",
    owner: "Daniel Lee",
    status: "At Risk",
    plan: "Starter",
    projects: 3,
    lastContact: "Jun 10",
  },
];

const clientSummary = [
  { label: "Total Clients", value: "125" },
  { label: "Active Accounts", value: "108" },
  { label: "Renewals Due", value: "14" },
  { label: "At Risk", value: "6" },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="clients" />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              Client Details
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              Clients
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Review account ownership, current status, project load, and recent
              client contact activity.
            </p>
          </div>

          <button
            className="h-11 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            type="button"
          >
            Add Client
          </button>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {clientSummary.map((item) => (
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

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center">
            <h2 className="text-lg font-semibold tracking-normal">
              Client Directory
            </h2>
            <input
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:max-w-xs"
              placeholder="Search clients"
              type="search"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Owner</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Plan</th>
                  <th className="px-5 py-3 font-semibold">Projects</th>
                  <th className="px-5 py-3 font-semibold">Last Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((client) => (
                  <tr className="transition hover:bg-slate-50" key={client.name}>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {client.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {client.owner}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {client.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{client.plan}</td>
                    <td className="px-5 py-4 font-semibold">
                      {client.projects}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {client.lastContact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
