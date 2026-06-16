"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  clients,
  formatProjectDate,
  initialProjects,
  owners,
  ProjectRecord,
  ProjectStatus,
  projectStatuses,
  projectsStorageKey,
} from "./project-data";

type ProjectForm = {
  name: string;
  client: string;
  owner: string;
  scope: string;
  startDate: string;
  dueDate: string;
  status: ProjectStatus;
};

const initialForm: ProjectForm = {
  name: "",
  client: clients[0],
  owner: owners[0],
  scope: "",
  startDate: "",
  dueDate: "",
  status: "On Track",
};

function readStoredProjects() {
  try {
    const storedProjects = window.localStorage.getItem(projectsStorageKey);

    if (!storedProjects) {
      return initialProjects;
    }

    return JSON.parse(storedProjects) as ProjectRecord[];
  } catch {
    return initialProjects;
  }
}

function getInitialProgress(status: ProjectStatus) {
  if (status === "Blocked") {
    return 10;
  }

  if (status === "At Risk") {
    return 25;
  }

  if (status === "Client Review") {
    return 75;
  }

  return 15;
}

export function NewProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [message, setMessage] = useState(
    "Capture the project basics before creating the record.",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const scope = form.scope.trim();

    if (name.length < 3) {
      setMessage("Project name needs at least 3 characters.");
      return;
    }

    if (scope.length < 20) {
      setMessage("Scope summary needs at least 20 characters.");
      return;
    }

    if (!form.startDate || !form.dueDate) {
      setMessage("Choose both a start date and due date.");
      return;
    }

    if (new Date(form.dueDate) < new Date(form.startDate)) {
      setMessage("Due date must be on or after the start date.");
      return;
    }

    const currentProjects = readStoredProjects();
    const duplicateProject = currentProjects.find(
      (project) => project.name.toLowerCase() === name.toLowerCase(),
    );

    if (duplicateProject) {
      setMessage(`${duplicateProject.name} already exists in the portfolio.`);
      return;
    }

    const nextProject: ProjectRecord = {
      name,
      client: form.client,
      owner: form.owner,
      status: form.status,
      progress: getInitialProgress(form.status),
      dueDate: formatProjectDate(form.dueDate),
      startDate: form.startDate,
      scope,
    };

    window.localStorage.setItem(
      projectsStorageKey,
      JSON.stringify([...currentProjects, nextProject]),
    );

    setMessage(`${name} created. Returning to the project portfolio.`);
    window.setTimeout(() => router.push("/projects"), 350);
  }

  return (
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

      <form
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        onSubmit={handleSubmit}
      >
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
                title="Use at least 3 letters or numbers for the project name."
                type="text"
                value={form.name}
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
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      client: event.target.value,
                    }))
                  }
                  value={form.client}
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
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      owner: event.target.value,
                    }))
                  }
                  value={form.owner}
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
                maxLength={600}
                minLength={20}
                name="scope"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    scope: event.target.value,
                  }))
                }
                required
                value={form.scope}
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
                min="2026-01-01"
                name="startDate"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    startDate: event.target.value,
                  }))
                }
                required
                type="date"
                value={form.startDate}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Due Date
              </span>
              <input
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                min="2026-01-01"
                name="dueDate"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    dueDate: event.target.value,
                  }))
                }
                required
                type="date"
                value={form.dueDate}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Initial Status
              </span>
              <select
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                name="status"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    status: event.target.value as ProjectStatus,
                  }))
                }
                value={form.status}
              >
                {projectStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-6 rounded-md bg-slate-50 px-3 py-2 text-sm font-medium leading-6 text-slate-600">
            {message}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="h-12 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              type="submit"
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
  );
}
