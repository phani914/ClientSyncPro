import Link from "next/link";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const reportSummary = [
  { label: "Published Reports", value: "48" },
  { label: "Scheduled", value: "16" },
  { label: "Drafts", value: "7" },
  { label: "Exports This Month", value: "132" },
];

const reports = [
  {
    name: "Client Health Overview",
    category: "Client Success",
    owner: "Priya Shah",
    cadence: "Weekly",
    status: "Published",
    updated: "Today",
  },
  {
    name: "Project Delivery Risk",
    category: "Projects",
    owner: "Arjun Mehta",
    cadence: "Daily",
    status: "Scheduled",
    updated: "Yesterday",
  },
  {
    name: "Compliance Exceptions",
    category: "Compliance",
    owner: "Maya Rao",
    cadence: "Monthly",
    status: "Draft",
    updated: "Jun 12",
  },
  {
    name: "Support Response Trends",
    category: "Support",
    owner: "Daniel Lee",
    cadence: "Weekly",
    status: "Published",
    updated: "Jun 10",
  },
];

const scheduledReports = [
  { name: "Executive Summary", delivery: "Monday, 08:00 AM", recipients: 12 },
  { name: "Project Risk Digest", delivery: "Daily, 06:00 PM", recipients: 8 },
  { name: "Compliance Snapshot", delivery: "First day monthly", recipients: 6 },
  { name: "Support SLA Report", delivery: "Friday, 04:30 PM", recipients: 10 },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="reports" />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              Report Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              Reports
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Manage operational reports, export schedules, ownership, and
              delivery cadence across client and project workflows.
            </p>
          </div>

          <Link
            className="grid h-11 place-items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            href="/reports/new"
          >
            New Report
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {reportSummary.map((item) => (
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
                Report Library
              </h2>
              <input
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:max-w-xs"
                placeholder="Search reports"
                type="search"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Report</th>
                    <th className="px-5 py-3 font-semibold">Category</th>
                    <th className="px-5 py-3 font-semibold">Owner</th>
                    <th className="px-5 py-3 font-semibold">Cadence</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report) => (
                    <tr
                      className="transition hover:bg-slate-50"
                      key={report.name}
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {report.name}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {report.category}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {report.owner}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {report.cadence}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {report.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {report.updated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Scheduled Delivery
            </h2>

            <div className="mt-5 grid gap-3">
              {scheduledReports.map((report) => (
                <div
                  className="rounded-md border border-slate-200 p-4"
                  key={report.name}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-slate-900">
                      {report.name}
                    </p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {report.recipients}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    {report.delivery}
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
