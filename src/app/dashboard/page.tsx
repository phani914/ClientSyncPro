import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const stats = [
  { label: "Total Clients", value: "125" },
  { label: "Active Projects", value: "240" },
  { label: "Employees", value: "85" },
  { label: "Compliance %", value: "96%" },
];

const healthBars = [
  { label: "On Track", value: 78, className: "bg-[#1fb5ff]" },
  { label: "At Risk", value: 46, className: "bg-[#a5f12b]" },
  { label: "Blocked", value: 18, className: "bg-[#f97316]" },
];

const activities = [
  {
    type: "User Login",
    detail: "Priya S. accessed the admin dashboard",
    time: "09:42 AM",
  },
  {
    type: "Project Update",
    detail: "RetailOps Portal moved to client review",
    time: "10:15 AM",
  },
  {
    type: "Ticket Created",
    detail: "New support request opened for CareDesk CRM",
    time: "11:08 AM",
  },
  {
    type: "Compliance Alert",
    detail: "Security review pending for 2 projects",
    time: "12:30 PM",
  },
];

const milestones = [
  {
    client: "RetailOps",
    task: "Stakeholder walkthrough",
    owner: "Aarav M.",
    due: "Today",
    status: "Due",
    className: "bg-[#f97316]/10 text-[#c2410c]",
  },
  {
    client: "CareDesk",
    task: "Security evidence review",
    owner: "Priya S.",
    due: "Tomorrow",
    status: "Review",
    className: "bg-[#1fb5ff]/10 text-[#0369a1]",
  },
  {
    client: "FinEdge",
    task: "Sprint handoff",
    owner: "Nisha R.",
    due: "Jun 24",
    status: "Ready",
    className: "bg-[#a5f12b]/20 text-[#3f6212]",
  },
];

const pipelineStages = [
  { label: "Discovery", value: "$48K", width: 42, className: "bg-[#1fb5ff]" },
  { label: "Proposal", value: "$86K", width: 66, className: "bg-[#a5f12b]" },
  { label: "Negotiation", value: "$124K", width: 88, className: "bg-[#f97316]" },
];

const teamLoad = [
  { name: "Delivery", assigned: 18, capacity: 24 },
  { name: "Support", assigned: 31, capacity: 36 },
  { name: "Compliance", assigned: 9, capacity: 12 },
  { name: "Sales", assigned: 14, capacity: 20 },
];

const supportQueue = [
  { priority: "Critical", count: 4, className: "text-[#c2410c]" },
  { priority: "High", count: 12, className: "text-[#0369a1]" },
  { priority: "Normal", count: 28, className: "text-[#3f6212]" },
];

const renewals = [
  { client: "Northstar Health", date: "Jun 28", value: "$18.5K" },
  { client: "BrightLedger", date: "Jul 03", value: "$12K" },
  { client: "Atlas Supply", date: "Jul 09", value: "$26.4K" },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="dashboard" />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={stat.label}
            >
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-normal">
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-lg font-semibold tracking-normal">
                Project Health Summary
              </h1>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Live
              </span>
            </div>

            <div className="mt-8 grid gap-5">
              {healthBars.map((item) => (
                <div className="grid gap-2" key={item.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">
                      {item.label}
                    </span>
                    <span className="font-semibold text-slate-500">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.className}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Compliance Status
            </h2>

            <div className="mt-7 grid justify-items-center gap-5">
              <div className="grid size-48 place-items-center rounded-full bg-[conic-gradient(#a5f12b_0_78%,#1fb5ff_78%_94%,#f97316_94%_100%)]">
                <div className="grid size-28 place-items-center rounded-full bg-white text-center shadow-inner">
                  <span className="text-3xl font-semibold">96%</span>
                </div>
              </div>

              <div className="grid w-full gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <span className="size-3 rounded-sm bg-[#a5f12b]" />
                    Compliant
                  </span>
                  <span className="font-semibold">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <span className="size-3 rounded-sm bg-[#1fb5ff]" />
                    Review
                  </span>
                  <span className="font-semibold">16%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-slate-600">
                    <span className="size-3 rounded-sm bg-[#f97316]" />
                    Alert
                  </span>
                  <span className="font-semibold">6%</span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-normal">
                Upcoming Milestones
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Priority client commitments across active projects
              </p>
            </div>
            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Next 7 days
            </span>
          </div>

          <div className="grid gap-0 md:grid-cols-3 md:divide-x md:divide-slate-100">
            {milestones.map((milestone) => (
              <article className="grid gap-4 p-5" key={milestone.task}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {milestone.client}
                    </p>
                    <h3 className="mt-2 text-base font-semibold tracking-normal text-slate-950">
                      {milestone.task}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${milestone.className}`}
                  >
                    {milestone.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-md bg-slate-50 p-3 text-sm">
                  <div>
                    <p className="font-semibold text-slate-500">Owner</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {milestone.owner}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-500">Due</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {milestone.due}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-normal">
                Revenue Pipeline
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                $258K
              </span>
            </div>

            <div className="mt-6 grid gap-5">
              {pipelineStages.map((stage) => (
                <div className="grid gap-2" key={stage.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">
                      {stage.label}
                    </span>
                    <span className="font-semibold text-slate-500">
                      {stage.value}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${stage.className}`}
                      style={{ width: `${stage.width}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Team Workload
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {teamLoad.map((team) => {
                const load = Math.round((team.assigned / team.capacity) * 100);

                return (
                  <div
                    className="rounded-md border border-slate-100 bg-slate-50 p-4"
                    key={team.name}
                  >
                    <p className="text-sm font-semibold text-slate-500">
                      {team.name}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-normal">
                      {load}%
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {team.assigned} of {team.capacity} tasks
                    </p>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-normal">
                Support Queue
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                44 open
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              {supportQueue.map((item) => (
                <div
                  className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3"
                  key={item.priority}
                >
                  <span className="text-sm font-semibold text-slate-600">
                    {item.priority}
                  </span>
                  <span
                    className={`text-xl font-semibold tracking-normal ${item.className}`}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-normal">
                Client Renewals
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                30 days
              </span>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              {renewals.map((renewal) => (
                <div
                  className="grid grid-cols-[1fr_auto] gap-4 py-3 first:pt-0 last:pb-0"
                  key={renewal.client}
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {renewal.client}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Renewal date: {renewal.date}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-700">
                    {renewal.value}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-lg font-semibold tracking-normal">
              Recent Activities
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">User Login</th>
                  <th className="px-5 py-3 font-semibold">Project Update</th>
                  <th className="px-5 py-3 font-semibold">Ticket Created</th>
                  <th className="px-5 py-3 font-semibold">Compliance Alert</th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-slate-100">
                  {activities.map((activity) => (
                    <td className="px-5 py-4 align-top" key={activity.type}>
                      <p className="font-semibold text-slate-900">
                        {activity.detail}
                      </p>
                      <p className="mt-2 text-xs font-medium text-slate-500">
                        {activity.time}
                      </p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
