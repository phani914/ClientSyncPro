"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiGet, apiSend } from "@/lib/browser-api";
import {
  initialReports,
  reportCadences,
  ReportCadence,
  ReportCategory,
  reportCategories,
  ReportRecord,
  reportStatuses,
  ReportStatus,
} from "./report-data";

type ReportsApiData = {
  reports: ReportRecord[];
  exportCount: number;
};

function getDeliveryText(report: ReportRecord) {
  if (report.cadence === "Daily") {
    return "Daily, 06:00 PM";
  }

  if (report.cadence === "Weekly") {
    return "Monday, 08:00 AM";
  }

  if (report.cadence === "Monthly") {
    return "First day monthly";
  }

  return "Manual export";
}

export function ReportsManagement() {
  const [reports, setReports] = useState<ReportRecord[]>(initialReports);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReportStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | ReportCategory>(
    "all",
  );
  const [exportCount, setExportCount] = useState(132);
  const [message, setMessage] = useState("Report library ready.");

  useEffect(() => {
    let isMounted = true;

    apiGet<ReportsApiData>("/api/reports")
      .then((data) => {
        if (isMounted) {
          setReports(data.reports);
          setExportCount(data.exportCount);
        }
      })
      .catch((error: Error) => {
        if (isMounted) {
          setMessage(error.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function persistReports(nextReports: ReportRecord[]) {
    setReports(nextReports);
  }

  async function updateStatus(reportName: string, status: ReportStatus) {
    const nextReports = reports.map((report) =>
      report.name === reportName
        ? { ...report, status, updated: "Today" }
        : report,
    );

    persistReports(nextReports);
    try {
      await apiSend<ReportRecord>("/api/reports", "PATCH", {
        name: reportName,
        updates: { status, updated: "Today" },
      });
      setMessage(`${reportName} moved to ${status}.`);
    } catch (error) {
      setReports(reports);
      setMessage(error instanceof Error ? error.message : "Report update failed.");
    }
  }

  async function updateCadence(reportName: string, cadence: ReportCadence) {
    const nextReports = reports.map((report) =>
      report.name === reportName
        ? { ...report, cadence, updated: "Today" }
        : report,
    );

    persistReports(nextReports);
    try {
      await apiSend<ReportRecord>("/api/reports", "PATCH", {
        name: reportName,
        updates: { cadence, updated: "Today" },
      });
      setMessage(`${reportName} cadence updated to ${cadence}.`);
    } catch (error) {
      setReports(reports);
      setMessage(error instanceof Error ? error.message : "Report update failed.");
    }
  }

  async function exportReport(reportName: string) {
    const nextCount = exportCount + 1;

    setExportCount(nextCount);
    try {
      const data = await apiSend<{ exportCount: number }>(
        "/api/reports/export",
        "POST",
      );
      setExportCount(data.exportCount);
      setMessage(`${reportName} exported.`);
    } catch (error) {
      setExportCount(exportCount);
      setMessage(error instanceof Error ? error.message : "Report export failed.");
    }
  }

  async function deleteReport(reportName: string) {
    const confirmed = window.confirm(`Remove ${reportName} from reports?`);

    if (!confirmed) {
      return;
    }

    const nextReports = reports.filter((report) => report.name !== reportName);
    persistReports(nextReports);
    try {
      await apiSend<ReportRecord[]>("/api/reports", "DELETE", { name: reportName });
      setMessage(`${reportName} removed from the library.`);
    } catch (error) {
      setReports(reports);
      setMessage(error instanceof Error ? error.message : "Report delete failed.");
    }
  }

  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || report.category === categoryFilter;
      const matchesQuery =
        !normalizedQuery ||
        [
          report.name,
          report.category,
          report.owner,
          report.cadence,
          report.status,
          report.format,
          report.description,
          report.dataSources.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesCategory && matchesQuery;
    });
  }, [categoryFilter, query, reports, statusFilter]);

  const reportSummary = useMemo(
    () => [
      {
        label: "Published Reports",
        value: String(
          reports.filter((report) => report.status === "Published").length,
        ),
      },
      {
        label: "Scheduled",
        value: String(
          reports.filter((report) => report.status === "Scheduled").length,
        ),
      },
      {
        label: "Drafts",
        value: String(
          reports.filter((report) => report.status === "Draft").length,
        ),
      },
      { label: "Exports This Month", value: String(exportCount) },
    ],
    [exportCount, reports],
  );

  const scheduledReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          report.status === "Scheduled" || report.status === "Published",
      ),
    [reports],
  );

  return (
    <div className="mx-auto grid max-w-[92rem] gap-4 px-3 py-4 sm:gap-6 sm:px-6 sm:py-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Report Management
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
            Reports
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Manage operational reports, export schedules, ownership, and
            delivery cadence across client and project workflows.
          </p>
        </div>

        <Link
          className="grid h-11 w-full place-items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
          href="/reports/new"
        >
          New Report
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportSummary.map((item) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            key={item.label}
          >
            <p className="text-sm font-semibold text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-normal sm:mt-4 sm:text-4xl">
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.65fr_0.75fr]">
        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-5 xl:flex-row xl:items-center">
            <div>
              <h2 className="text-lg font-semibold tracking-normal">
                Report Library
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {message}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <input
                aria-label="Search reports"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 xl:w-52"
                maxLength={80}
                minLength={2}
                name="reportSearch"
                onChange={(event) => setQuery(event.target.value)}
                pattern="[A-Za-z0-9 .,&()/-]*"
                placeholder="Search reports"
                title="Enter at least 2 letters or numbers to search reports."
                type="search"
                value={query}
              />
              <select
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 xl:w-44"
                name="status"
                onChange={(event) =>
                  setStatusFilter(event.target.value as "all" | ReportStatus)
                }
                value={statusFilter}
              >
                <option value="all">All Statuses</option>
                {reportStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <select
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:col-span-2 xl:col-span-1 xl:w-48"
                name="category"
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value as "all" | ReportCategory,
                  )
                }
                value={categoryFilter}
              >
                <option value="all">All Categories</option>
                {reportCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 p-3 md:hidden">
            {filteredReports.map((report) => (
              <article
                className="rounded-lg border border-slate-200 p-4"
                key={report.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {report.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                      {report.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {report.format}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Category
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {report.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Owner
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {report.owner}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Updated
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {report.updated}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Recipients
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {report.recipients}{" "}
                      {report.recipients === 1 ? "recipient" : "recipients"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <select
                    aria-label={`Update ${report.name} cadence`}
                    className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    onChange={(event) =>
                      updateCadence(
                        report.name,
                        event.target.value as ReportCadence,
                      )
                    }
                    value={report.cadence}
                  >
                    {reportCadences.map((cadence) => (
                      <option key={cadence}>{cadence}</option>
                    ))}
                  </select>
                  <select
                    aria-label={`Update ${report.name} status`}
                    className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                    onChange={(event) =>
                      updateStatus(
                        report.name,
                        event.target.value as ReportStatus,
                      )
                    }
                    value={report.status}
                  >
                    {reportStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    className="h-10 rounded-md border border-slate-300 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                    onClick={() => exportReport(report.name)}
                    type="button"
                  >
                    Export
                  </button>
                  <button
                    className="h-10 rounded-md border border-red-200 px-3 text-xs font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                    onClick={() => deleteReport(report.name)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1320px] text-left text-base">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Report</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Owner</th>
                  <th className="px-6 py-4 font-semibold">Cadence</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Format</th>
                  <th className="px-6 py-4 font-semibold">Updated</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((report) => (
                  <tr className="transition hover:bg-slate-50" key={report.name}>
                    <td className="px-6 py-5 align-top">
                      <p className="font-semibold text-slate-900">
                        {report.name}
                      </p>
                      <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500">
                        {report.description}
                      </p>
                    </td>
                    <td className="px-6 py-5 align-top text-slate-600">
                      {report.category}
                    </td>
                    <td className="px-6 py-5 align-top text-slate-600">
                      {report.owner}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <select
                        aria-label={`Update ${report.name} cadence`}
                        className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                        onChange={(event) =>
                          updateCadence(
                            report.name,
                            event.target.value as ReportCadence,
                          )
                        }
                        value={report.cadence}
                      >
                        {reportCadences.map((cadence) => (
                          <option key={cadence}>{cadence}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <select
                        aria-label={`Update ${report.name} status`}
                        className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                        onChange={(event) =>
                          updateStatus(
                            report.name,
                            event.target.value as ReportStatus,
                          )
                        }
                        value={report.status}
                      >
                        {reportStatuses.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-5 align-top font-semibold">
                      {report.format}
                    </td>
                    <td className="px-6 py-5 align-top text-slate-600">
                      {report.updated}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="flex gap-2">
                        <button
                          className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                          onClick={() => exportReport(report.name)}
                          type="button"
                        >
                          Export
                        </button>
                        <button
                          className="rounded-md border border-red-200 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                          onClick={() => deleteReport(report.name)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 ? (
            <div className="m-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
              <p className="text-sm font-semibold text-slate-900">
                No reports found
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Adjust the search, status, or category filters.
              </p>
            </div>
          ) : null}
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
                  <p className="font-semibold text-slate-900">{report.name}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {report.recipients}{" "}
                    {report.recipients === 1 ? "recipient" : "recipients"}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  {getDeliveryText(report)}
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  {report.format} export
                </p>
              </div>
            ))}
          </div>

          {scheduledReports.length === 0 ? (
            <p className="mt-5 text-sm font-medium text-slate-600">
              No scheduled reports yet.
            </p>
          ) : null}
        </article>
      </section>
    </div>
  );
}
