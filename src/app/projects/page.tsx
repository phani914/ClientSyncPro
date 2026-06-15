import Link from "next/link";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const projectSummary = [
  { label: "Total Projects", value: "240" },
  { label: "On Track", value: "182" },
  { label: "At Risk", value: "41" },
  { label: "Blocked", value: "17" },
];

const projects = [
  {
    name: "RetailOps Portal",
    client: "RetailOps Group",
    owner: "Arjun Mehta",
    status: "Client Review",
    progress: 82,
    dueDate: "Jun 28",
  },
  {
    name: "CareDesk CRM Migration",
    client: "CareDesk CRM",
    owner: "Daniel Lee",
    status: "Blocked",
    progress: 38,
    dueDate: "Jul 05",
  },
  {
    name: "Northstar Compliance Hub",
    client: "Northstar Finance",
    owner: "Maya Rao",
    status: "On Track",
    progress: 64,
    dueDate: "Jul 18",
  },
  {
    name: "Acme Patient Connect",
    client: "Acme Health Systems",
    owner: "Priya Shah",
    status: "At Risk",
    progress: 51,
    dueDate: "Jul 24",
  },
];

const milestones = [
  { name: "Discovery complete", date: "Jun 18", status: "Done" },
  { name: "Prototype approval", date: "Jun 25", status: "Upcoming" },
  { name: "Security review", date: "Jul 02", status: "At Risk" },
  { name: "Production launch", date: "Jul 19", status: "Planned" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="projects" />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              Project Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              Projects
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Track delivery health, project owners, milestones, due dates, and
              blockers across active client work.
            </p>
          </div>

          <Link
            className="grid h-11 place-items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            href="/projects/new"
          >
            New Project
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {projectSummary.map((item) => (
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
                Project Portfolio
              </h2>
              <select
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:max-w-48"
                defaultValue="all"
                name="status"
                required
              >
                <option value="all">All Statuses</option>
                <option value="on-track">On Track</option>
                <option value="at-risk">At Risk</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Project</th>
                    <th className="px-5 py-3 font-semibold">Client</th>
                    <th className="px-5 py-3 font-semibold">Owner</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Progress</th>
                    <th className="px-5 py-3 font-semibold">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map((project) => (
                    <tr
                      className="transition hover:bg-slate-50"
                      key={project.name}
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {project.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {project.client}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {project.owner}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {project.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#1fb5ff]"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="font-semibold">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {project.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Upcoming Milestones
            </h2>

            <div className="mt-5 grid gap-3">
              {milestones.map((milestone) => (
                <div
                  className="grid gap-2 rounded-md border border-slate-200 p-4"
                  key={milestone.name}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">
                      {milestone.name}
                    </p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {milestone.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Due {milestone.date}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
