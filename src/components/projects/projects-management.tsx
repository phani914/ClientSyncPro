"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiGet, apiSend } from "@/lib/browser-api";
import {
  initialMilestones,
  initialProjects,
  ProjectRecord,
  ProjectStatus,
} from "./project-data";

export function ProjectsManagement() {
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectStatus>("all");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("Project portfolio ready.");

  useEffect(() => {
    let isMounted = true;

    apiGet<ProjectRecord[]>("/api/projects")
      .then((nextProjects) => {
        if (isMounted) {
          setProjects(nextProjects);
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

  function persistProjects(nextProjects: ProjectRecord[]) {
    setProjects(nextProjects);
  }

  async function updateStatus(projectName: string, status: ProjectStatus) {
    const nextProjects = projects.map((project) =>
      project.name === projectName ? { ...project, status } : project,
    );

    persistProjects(nextProjects);
    try {
      await apiSend<ProjectRecord>("/api/projects", "PATCH", {
        name: projectName,
        updates: { status },
      });
      setMessage(`${projectName} moved to ${status}.`);
    } catch (error) {
      setProjects(projects);
      setMessage(error instanceof Error ? error.message : "Project update failed.");
    }
  }

  async function updateProgress(
    projectName: string,
    direction: "increase" | "decrease",
  ) {
    let changedProject: ProjectRecord | undefined;
    const nextProjects = projects.map((project) => {
      if (project.name !== projectName) {
        return project;
      }

      const nextProgress =
        direction === "increase"
          ? Math.min(project.progress + 10, 100)
          : Math.max(project.progress - 10, 0);

      changedProject = {
        ...project,
        progress: nextProgress,
        status:
          nextProgress === 100
            ? "Client Review"
            : project.status === "Client Review" && nextProgress < 75
              ? "On Track"
              : project.status,
      };

      return changedProject;
    });

    persistProjects(nextProjects);
    try {
      await apiSend<ProjectRecord>("/api/projects", "PATCH", {
        name: projectName,
        updates: changedProject
          ? { progress: changedProject.progress, status: changedProject.status }
          : {},
      });
      setMessage(`${projectName} progress updated.`);
    } catch (error) {
      setProjects(projects);
      setMessage(error instanceof Error ? error.message : "Project update failed.");
    }
  }

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [project.name, project.client, project.owner, project.status]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [projects, query, statusFilter]);

  const projectSummary = useMemo(
    () => [
      { label: "Total Projects", value: String(projects.length) },
      {
        label: "On Track",
        value: String(
          projects.filter((project) => project.status === "On Track").length,
        ),
      },
      {
        label: "At Risk",
        value: String(
          projects.filter((project) => project.status === "At Risk").length,
        ),
      },
      {
        label: "Blocked",
        value: String(
          projects.filter((project) => project.status === "Blocked").length,
        ),
      },
    ],
    [projects],
  );

  return (
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
            <p className="text-sm font-semibold text-slate-500">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-normal">
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 xl:flex-row xl:items-center">
            <div>
              <h2 className="text-lg font-semibold tracking-normal">
                Project Portfolio
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {message}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                aria-label="Search projects"
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:w-56"
                maxLength={80}
                minLength={2}
                name="projectSearch"
                onChange={(event) => setQuery(event.target.value)}
                pattern="[A-Za-z0-9 .,&()/'-]*"
                placeholder="Search projects"
                title="Enter at least 2 letters or numbers to search projects."
                type="search"
                value={query}
              />
              <select
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:w-48"
                name="status"
                onChange={(event) =>
                  setStatusFilter(event.target.value as "all" | ProjectStatus)
                }
                required
                value={statusFilter}
              >
                <option value="all">All Statuses</option>
                <option value="On Track">On Track</option>
                <option value="At Risk">At Risk</option>
                <option value="Blocked">Blocked</option>
                <option value="Client Review">Client Review</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Project</th>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Owner</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Progress</th>
                  <th className="px-5 py-3 font-semibold">Due Date</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((project) => (
                  <tr className="transition hover:bg-slate-50" key={project.name}>
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
                      <select
                        aria-label={`Update ${project.name} status`}
                        className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                        onChange={(event) =>
                          updateStatus(
                            project.name,
                            event.target.value as ProjectStatus,
                          )
                        }
                        value={project.status}
                      >
                        <option>On Track</option>
                        <option>At Risk</option>
                        <option>Blocked</option>
                        <option>Client Review</option>
                      </select>
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
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                          onClick={() => updateProgress(project.name, "decrease")}
                          type="button"
                        >
                          -10%
                        </button>
                        <button
                          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                          onClick={() => updateProgress(project.name, "increase")}
                          type="button"
                        >
                          +10%
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProjects.length === 0 ? (
            <p className="border-t border-slate-100 px-5 py-4 text-sm font-medium text-slate-600">
              No projects match your filters.
            </p>
          ) : null}
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-normal">
            Upcoming Milestones
          </h2>

          <div className="mt-5 grid gap-3">
            {initialMilestones.map((milestone) => (
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
  );
}
