"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiGet, apiSend } from "@/lib/browser-api";
import {
  clientPlans,
  ClientPlan,
  ClientRecord,
  clientStatuses,
  ClientStatus,
  initialClients,
} from "./client-data";

export function ClientsManagement() {
  const [clients, setClients] = useState<ClientRecord[]>(initialClients);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ClientStatus>("all");
  const [message, setMessage] = useState("Client directory ready.");

  useEffect(() => {
    let isMounted = true;

    apiGet<ClientRecord[]>("/api/clients")
      .then((nextClients) => {
        if (isMounted) {
          setClients(nextClients);
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

  async function persistClients(nextClients: ClientRecord[]) {
    setClients(nextClients);
  }

  async function updateStatus(clientName: string, status: ClientStatus) {
    const nextClients = clients.map((client) =>
      client.name === clientName
        ? { ...client, status, lastContact: "Today" }
        : client,
    );

    await persistClients(nextClients);
    try {
      await apiSend<ClientRecord>("/api/clients", "PATCH", {
        name: clientName,
        updates: { status, lastContact: "Today" },
      });
      setMessage(`${clientName} moved to ${status}.`);
    } catch (error) {
      setClients(clients);
      setMessage(error instanceof Error ? error.message : "Client update failed.");
    }
  }

  async function updatePlan(clientName: string, plan: ClientPlan) {
    const nextClients = clients.map((client) =>
      client.name === clientName
        ? { ...client, plan, lastContact: "Today" }
        : client,
    );

    await persistClients(nextClients);
    try {
      await apiSend<ClientRecord>("/api/clients", "PATCH", {
        name: clientName,
        updates: { plan, lastContact: "Today" },
      });
      setMessage(`${clientName} plan updated to ${plan}.`);
    } catch (error) {
      setClients(clients);
      setMessage(error instanceof Error ? error.message : "Client update failed.");
    }
  }

  async function deleteClient(clientName: string) {
    const confirmed = window.confirm(`Remove ${clientName} from clients?`);

    if (!confirmed) {
      return;
    }

    const nextClients = clients.filter((client) => client.name !== clientName);
    await persistClients(nextClients);
    try {
      await apiSend<ClientRecord[]>("/api/clients", "DELETE", { name: clientName });
      setMessage(`${clientName} removed from the directory.`);
    } catch (error) {
      setClients(clients);
      setMessage(error instanceof Error ? error.message : "Client delete failed.");
    }
  }

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesStatus =
        statusFilter === "all" || client.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [
          client.name,
          client.owner,
          client.status,
          client.plan,
          client.contactName,
          client.contactEmail,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [clients, query, statusFilter]);

  const clientSummary = useMemo(
    () => [
      { label: "Total Clients", value: String(clients.length) },
      {
        label: "Active Accounts",
        value: String(
          clients.filter((client) => client.status === "Active").length,
        ),
      },
      {
        label: "In Review",
        value: String(
          clients.filter((client) => client.status === "Review").length,
        ),
      },
      {
        label: "At Risk",
        value: String(
          clients.filter((client) => client.status === "At Risk").length,
        ),
      },
    ],
    [clients],
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-3 py-4 sm:gap-6 sm:px-6 sm:py-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Client Details
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
            Clients
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Review account ownership, current status, project load, and recent
            client contact activity.
          </p>
        </div>

        <Link
          className="grid h-11 w-full place-items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
          href="/clients/new"
        >
          Add Client
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {clientSummary.map((item) => (
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

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-5 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-lg font-semibold tracking-normal">
              Client Directory
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-600">{message}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              aria-label="Search clients"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:w-56"
              maxLength={80}
              minLength={2}
              name="clientSearch"
              onChange={(event) => setQuery(event.target.value)}
              pattern="[A-Za-z0-9 .,&'-]*"
              placeholder="Search clients"
              title="Enter at least 2 letters or numbers to search clients."
              type="search"
              value={query}
            />
            <select
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:w-48"
              name="status"
              onChange={(event) =>
                setStatusFilter(event.target.value as "all" | ClientStatus)
              }
              value={statusFilter}
            >
              <option value="all">All Statuses</option>
              {clientStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 p-3 md:hidden">
          {filteredClients.map((client) => (
            <article
              className="rounded-lg border border-slate-200 p-4"
              key={client.name}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {client.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    {client.notes}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {client.projects}{" "}
                  {client.projects === 1 ? "project" : "projects"}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase text-slate-500">
                    Owner
                  </dt>
                  <dd className="mt-1 font-semibold text-slate-900">
                    {client.owner}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-slate-500">
                    Last Contact
                  </dt>
                  <dd className="mt-1 font-semibold text-slate-900">
                    {client.lastContact}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-xs font-semibold uppercase text-slate-500">
                    Primary Contact
                  </dt>
                  <dd className="mt-1 font-semibold text-slate-900">
                    {client.contactName}
                  </dd>
                  <dd className="break-words text-xs font-medium text-slate-500">
                    {client.contactEmail}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <select
                  aria-label={`Update ${client.name} status`}
                  className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  onChange={(event) =>
                    updateStatus(client.name, event.target.value as ClientStatus)
                  }
                  value={client.status}
                >
                  {clientStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <select
                  aria-label={`Update ${client.name} plan`}
                  className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  onChange={(event) =>
                    updatePlan(client.name, event.target.value as ClientPlan)
                  }
                  value={client.plan}
                >
                  {clientPlans.map((plan) => (
                    <option key={plan}>{plan}</option>
                  ))}
                </select>
              </div>

              <button
                className="mt-3 h-10 w-full rounded-md border border-red-200 px-3 text-xs font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                onClick={() => deleteClient(client.name)}
                type="button"
              >
                Delete
              </button>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Owner</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">Projects</th>
                <th className="px-5 py-3 font-semibold">Primary Contact</th>
                <th className="px-5 py-3 font-semibold">Last Contact</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr className="transition hover:bg-slate-50" key={client.name}>
                  <td className="px-5 py-4 align-top">
                    <p className="font-semibold text-slate-900">
                      {client.name}
                    </p>
                    <p className="mt-1 max-w-xs text-xs font-medium text-slate-500">
                      {client.notes}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-top text-slate-600">
                    {client.owner}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <select
                      aria-label={`Update ${client.name} status`}
                      className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                      onChange={(event) =>
                        updateStatus(
                          client.name,
                          event.target.value as ClientStatus,
                        )
                      }
                      value={client.status}
                    >
                      {clientStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <select
                      aria-label={`Update ${client.name} plan`}
                      className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs font-semibold text-slate-700 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                      onChange={(event) =>
                        updatePlan(client.name, event.target.value as ClientPlan)
                      }
                      value={client.plan}
                    >
                      {clientPlans.map((plan) => (
                        <option key={plan}>{plan}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 align-top font-semibold">
                    {client.projects}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <p className="font-semibold text-slate-900">
                      {client.contactName}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {client.contactEmail}
                    </p>
                  </td>
                  <td className="px-5 py-4 align-top text-slate-600">
                    {client.lastContact}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <button
                      className="rounded-md border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                      onClick={() => deleteClient(client.name)}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 ? (
          <div className="m-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm font-semibold text-slate-900">
              No clients found
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Adjust the search or status filter to expand the directory.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
