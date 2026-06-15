import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const auditEvents = [
  {
    event: "Password policy updated",
    owner: "Priya Shah",
    time: "Today, 10:05 AM",
  },
  {
    event: "Weekly report schedule changed",
    owner: "Maya Rao",
    time: "Yesterday, 03:44 PM",
  },
  {
    event: "New login domain approved",
    owner: "Arjun Mehta",
    time: "Jun 12, 11:18 AM",
  },
];

const integrations = [
  { name: "Email Delivery", status: "Connected" },
  { name: "Calendar Sync", status: "Connected" },
  { name: "Data Warehouse", status: "Needs Review" },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="settings" />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            System Settings
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Settings
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Configure organization defaults, access rules, notifications, and
            connected services for ClientSync Pro.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <form className="grid gap-6">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold tracking-normal">
                Organization Profile
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Organization Name
                  </span>
                  <input
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    defaultValue="ClientSync Pro"
                    name="organization"
                    type="text"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Support Email
                  </span>
                  <input
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    defaultValue="support@clientsync.pro"
                    name="supportEmail"
                    type="email"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Time Zone
                  </span>
                  <select
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    defaultValue="Asia/Kolkata"
                    name="timezone"
                  >
                    <option>Asia/Kolkata</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                    <option>Asia/Singapore</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Default Currency
                  </span>
                  <select
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    defaultValue="USD"
                    name="currency"
                  >
                    <option>USD</option>
                    <option>INR</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold tracking-normal">
                Security Controls
              </h2>

              <div className="mt-6 grid gap-4">
                <label className="flex items-center justify-between gap-4 rounded-md border border-slate-200 p-4">
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Require multi-factor authentication
                    </span>
                    <span className="mt-1 block text-sm font-medium text-slate-500">
                      Apply MFA to every admin and manager login.
                    </span>
                  </span>
                  <input
                    className="size-5 rounded border-slate-300 accent-slate-950"
                    defaultChecked
                    type="checkbox"
                  />
                </label>

                <label className="flex items-center justify-between gap-4 rounded-md border border-slate-200 p-4">
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Auto-lock inactive sessions
                    </span>
                    <span className="mt-1 block text-sm font-medium text-slate-500">
                      End dashboard sessions after 30 minutes of inactivity.
                    </span>
                  </span>
                  <input
                    className="size-5 rounded border-slate-300 accent-slate-950"
                    defaultChecked
                    type="checkbox"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold tracking-normal">
                Notifications
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700">
                  <input
                    className="size-4 rounded border-slate-300 accent-slate-950"
                    defaultChecked
                    type="checkbox"
                  />
                  Project risk alerts
                </label>
                <label className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700">
                  <input
                    className="size-4 rounded border-slate-300 accent-slate-950"
                    defaultChecked
                    type="checkbox"
                  />
                  Client renewal reminders
                </label>
                <label className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700">
                  <input
                    className="size-4 rounded border-slate-300 accent-slate-950"
                    type="checkbox"
                  />
                  Weekly executive summary
                </label>
                <label className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700">
                  <input
                    className="size-4 rounded border-slate-300 accent-slate-950"
                    defaultChecked
                    type="checkbox"
                  />
                  Compliance exceptions
                </label>
              </div>

              <div className="mt-8">
                <button
                  className="h-12 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                  type="button"
                >
                  Save Settings
                </button>
              </div>
            </section>
          </form>

          <aside className="grid gap-6">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold tracking-normal">
                Integrations
              </h2>

              <div className="mt-5 grid gap-3">
                {integrations.map((integration) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-md border border-slate-200 p-4"
                    key={integration.name}
                  >
                    <span className="font-semibold text-slate-900">
                      {integration.name}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {integration.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold tracking-normal">
                Recent Changes
              </h2>

              <div className="mt-5 grid gap-3">
                {auditEvents.map((item) => (
                  <div
                    className="rounded-md border border-slate-200 p-4"
                    key={item.event}
                  >
                    <p className="font-semibold text-slate-900">
                      {item.event}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      {item.owner} · {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
