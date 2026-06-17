"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  readStoredReports,
  ReportCadence,
  reportCadences,
  ReportCategory,
  reportCategories,
  reportDataSources,
  ReportFormat,
  reportFormats,
  ReportRecord,
  reportOwners,
  reportsStorageKey,
} from "./report-data";

type ReportForm = {
  name: string;
  category: ReportCategory;
  owner: string;
  description: string;
  cadence: ReportCadence;
  format: ReportFormat;
  dataSources: string[];
  recipients: string;
};

const initialForm: ReportForm = {
  name: "",
  category: "Client Success",
  owner: reportOwners[0],
  description: "",
  cadence: "Weekly",
  format: "PDF",
  dataSources: ["Client records"],
  recipients: "1",
};

function getInitialStatus(cadence: ReportCadence) {
  return cadence === "On Demand" ? "Draft" : "Scheduled";
}

export function NewReportForm() {
  const router = useRouter();
  const [form, setForm] = useState<ReportForm>(initialForm);
  const [message, setMessage] = useState(
    "Configure the report before creating the record.",
  );

  function toggleDataSource(source: string) {
    setForm((currentForm) => {
      const hasSource = currentForm.dataSources.includes(source);
      const nextSources = hasSource
        ? currentForm.dataSources.filter((item) => item !== source)
        : [...currentForm.dataSources, source];

      return {
        ...currentForm,
        dataSources: nextSources,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();
    const recipients = Number(form.recipients);

    if (name.length < 3) {
      setMessage("Report name needs at least 3 characters.");
      return;
    }

    if (description.length < 20) {
      setMessage("Description needs at least 20 characters.");
      return;
    }

    if (form.dataSources.length === 0) {
      setMessage("Select at least one data source.");
      return;
    }

    if (!Number.isInteger(recipients) || recipients < 1 || recipients > 100) {
      setMessage("Recipients must be a whole number from 1 to 100.");
      return;
    }

    const currentReports = readStoredReports();
    const duplicateReport = currentReports.find(
      (report) => report.name.toLowerCase() === name.toLowerCase(),
    );

    if (duplicateReport) {
      setMessage(`${duplicateReport.name} already exists in the library.`);
      return;
    }

    const nextReport: ReportRecord = {
      name,
      category: form.category,
      owner: form.owner,
      cadence: form.cadence,
      status: getInitialStatus(form.cadence),
      updated: "Today",
      format: form.format,
      description,
      dataSources: form.dataSources,
      recipients,
    };

    window.localStorage.setItem(
      reportsStorageKey,
      JSON.stringify([...currentReports, nextReport]),
    );

    setMessage(`${name} created. Returning to the report library.`);
    window.setTimeout(() => router.push("/reports"), 350);
  }

  return (
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
          <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>
        </div>
      </section>

      <form
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        onSubmit={handleSubmit}
      >
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
                maxLength={80}
                minLength={3}
                name="name"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    name: event.target.value,
                  }))
                }
                pattern="[A-Za-z0-9][A-Za-z0-9 .,&()/-]*"
                required
                title="Use at least 3 letters or numbers for the report name."
                type="text"
                value={form.name}
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
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      category: event.target.value as ReportCategory,
                    }))
                  }
                  value={form.category}
                >
                  {reportCategories.map((category) => (
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
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      owner: event.target.value,
                    }))
                  }
                  value={form.owner}
                >
                  {reportOwners.map((owner) => (
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
                maxLength={500}
                minLength={20}
                name="description"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    description: event.target.value,
                  }))
                }
                required
                value={form.description}
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
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    cadence: event.target.value as ReportCadence,
                  }))
                }
                value={form.cadence}
              >
                {reportCadences.map((cadence) => (
                  <option key={cadence}>{cadence}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Export Format
              </span>
              <select
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                name="format"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    format: event.target.value as ReportFormat,
                  }))
                }
                value={form.format}
              >
                {reportFormats.map((format) => (
                  <option key={format}>{format}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Recipients
              </span>
              <input
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                max={100}
                min={1}
                name="recipients"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    recipients: event.target.value,
                  }))
                }
                required
                type="number"
                value={form.recipients}
              />
            </label>

            <div className="grid gap-3">
              <p className="text-sm font-semibold text-slate-700">
                Data Sources
              </p>
              {reportDataSources.map((source) => (
                <label
                  className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700"
                  key={source}
                >
                  <input
                    checked={form.dataSources.includes(source)}
                    className="size-4 rounded border-slate-300 accent-slate-950"
                    onChange={() => toggleDataSource(source)}
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
              type="submit"
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
  );
}
