import Image from "next/image";

const navItems = [
  "Dashboard",
  "Clients",
  "Projects",
  "Users",
  "Reports",
  "Settings",
  "Logout",
];

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

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <header className="border-b border-slate-200 bg-[#111820] px-4 py-3 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
          <Image
            className="h-16 w-48 object-cover sm:w-56"
            src="/client-pro-logo.png"
            alt="ClientSync Pro"
            width={1536}
            height={1024}
            priority
          />

          <nav className="flex w-full justify-center gap-2 overflow-x-auto pb-1 text-sm font-semibold text-slate-100 lg:pb-0">
            {navItems.map((item) => (
              <a
                className={`shrink-0 rounded-md px-3 py-2 transition ${
                  item === "Dashboard"
                    ? "bg-white text-slate-950"
                    : "hover:bg-white/10"
                }`}
                href={item === "Logout" ? "/" : "#"}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

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
