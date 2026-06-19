"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiGet, apiSend } from "@/lib/browser-api";
import {
  clientPlans,
  clientStatuses,
  ClientPlan,
  ClientRecord,
  ClientStatus,
  owners,
} from "./client-data";

type ClientForm = {
  name: string;
  owner: string;
  status: ClientStatus;
  notes: string;
  contactName: string;
  contactEmail: string;
  plan: ClientPlan;
};

const initialForm: ClientForm = {
  name: "",
  owner: owners[0],
  status: "Onboarding",
  notes: "",
  contactName: "",
  contactEmail: "",
  plan: "Professional",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewClientForm() {
  const router = useRouter();
  const [form, setForm] = useState<ClientForm>(initialForm);
  const [message, setMessage] = useState(
    "Capture the client basics before creating the account.",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const contactName = form.contactName.trim();
    const contactEmail = form.contactEmail.trim();
    const notes = form.notes.trim();

    if (name.length < 3) {
      setMessage("Client name needs at least 3 characters.");
      return;
    }

    if (contactName.length < 2) {
      setMessage("Contact name needs at least 2 characters.");
      return;
    }

    if (!emailPattern.test(contactEmail)) {
      setMessage("Enter a valid contact email address.");
      return;
    }

    if (notes.length < 20) {
      setMessage("Account notes need at least 20 characters.");
      return;
    }

    const currentClients = await apiGet<ClientRecord[]>("/api/clients").catch(
      () => [],
    );
    const duplicateClient = currentClients.find(
      (client) => client.name.toLowerCase() === name.toLowerCase(),
    );

    if (duplicateClient) {
      setMessage(`${duplicateClient.name} already exists in the directory.`);
      return;
    }

    const nextClient: ClientRecord = {
      name,
      owner: form.owner,
      status: form.status,
      plan: form.plan,
      projects: 0,
      lastContact: "Today",
      contactName,
      contactEmail,
      notes,
    };

    try {
      await apiSend<ClientRecord>("/api/clients", "POST", nextClient);
      setMessage(`${name} created. Returning to the client directory.`);
      window.setTimeout(() => router.push("/clients"), 350);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Client creation failed.");
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          href="/clients"
        >
          Back to Clients
        </Link>

        <div className="mt-5">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Client Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Add Client
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Create a client record, assign ownership, choose a plan, and capture
            the primary contact details.
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
            Client Details
          </h2>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Client Name
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
                pattern="[A-Za-z0-9][A-Za-z0-9 .,&'-]*"
                required
                title="Use at least 3 letters or numbers for the client name."
                type="text"
                value={form.name}
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
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
                  required
                  value={form.owner}
                >
                  {owners.map((owner) => (
                    <option key={owner}>{owner}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Status
                </span>
                <select
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="status"
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      status: event.target.value as ClientStatus,
                    }))
                  }
                  required
                  value={form.status}
                >
                  {clientStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Account Notes
              </span>
              <textarea
                className="min-h-32 rounded-md border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                maxLength={500}
                minLength={20}
                name="notes"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    notes: event.target.value,
                  }))
                }
                required
                value={form.notes}
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-normal">
            Contact & Plan
          </h2>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Contact Name
              </span>
              <input
                autoComplete="name"
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                maxLength={60}
                minLength={2}
                name="contactName"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    contactName: event.target.value,
                  }))
                }
                pattern="[A-Za-z][A-Za-z .'-]*"
                required
                title="Enter a valid contact name using letters, spaces, apostrophes, periods, or hyphens."
                type="text"
                value={form.contactName}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Contact Email
              </span>
              <input
                autoComplete="email"
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                maxLength={120}
                name="contactEmail"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    contactEmail: event.target.value,
                  }))
                }
                required
                type="email"
                value={form.contactEmail}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">Plan</span>
              <select
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                name="plan"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    plan: event.target.value as ClientPlan,
                  }))
                }
                required
                value={form.plan}
              >
                {clientPlans.map((plan) => (
                  <option key={plan}>{plan}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="h-12 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              type="submit"
            >
              Create Client
            </button>
            <Link
              className="grid h-12 place-items-center rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              href="/clients"
            >
              Cancel
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}
