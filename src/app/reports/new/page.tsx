import Link from "next/link";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

const categories = ["Client Success", "Projects", "Compliance", "Support"];
const owners = ["Priya Shah", "Arjun Mehta", "Maya Rao", "Daniel Lee"];
const dataSources = [
  "Client records",
  "Project health",
  "Compliance alerts",
  "Support tickets",
];

export default function NewReportPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="reports" />

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Link
            className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
            href="/reports"
          >
            Back to Reports
          </Link>

          <div className="mt-5">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
              Report Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              New Report
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Configure report ownership, source data, export format, and
              scheduled delivery.
            </p>
          </div>
        </section>

        <form className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Report Details
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Report Name
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
                    Category
                  </span>
                  <select
                    className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    name="category"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
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
                  Description
                </span>
                <textarea
                  className="min-h-32 rounded-md border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="description"
                />
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold tracking-normal">
              Delivery Setup
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Cadence
                </span>
                <select
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="cadence"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>On Demand</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Export Format
                </span>
                <select
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="format"
                >
                  <option>PDF</option>
                  <option>XLSX</option>
                  <option>CSV</option>
                </select>
              </label>

              <div className="grid gap-3">
                <p className="text-sm font-semibold text-slate-700">
                  Data Sources
                </p>
                {dataSources.map((source) => (
                  <label
                    className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700"
                    key={source}
                  >
                    <input
                      className="size-4 rounded border-slate-300 accent-slate-950"
                      type="checkbox"
                    />
                    {source}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                className="h-12 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                type="button"
              >
                Create Report
              </button>
              <Link
                className="grid h-12 place-items-center rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                href="/reports"
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
