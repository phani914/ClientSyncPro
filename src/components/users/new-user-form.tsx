"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  initialUsers,
  permissions,
  roles,
  teams,
  UserRecord,
  UserRole,
  usersStorageKey,
  UserTeam,
} from "./user-data";

type UserForm = {
  name: string;
  email: string;
  role: UserRole;
  team: UserTeam;
  selectedPermissions: string[];
  sendInvite: boolean;
};

const initialForm: UserForm = {
  name: "",
  email: "",
  role: "Admin",
  team: "Operations",
  selectedPermissions: ["View compliance reports"],
  sendInvite: true,
};

function readStoredUsers() {
  try {
    const storedUsers = window.localStorage.getItem(usersStorageKey);

    if (!storedUsers) {
      return initialUsers;
    }

    return JSON.parse(storedUsers) as UserRecord[];
  } catch {
    return initialUsers;
  }
}

export function NewUserForm() {
  const router = useRouter();
  const [form, setForm] = useState<UserForm>(initialForm);
  const [message, setMessage] = useState("Complete the profile to create a user.");

  function togglePermission(permission: string) {
    setForm((currentForm) => {
      const hasPermission =
        currentForm.selectedPermissions.includes(permission);

      return {
        ...currentForm,
        selectedPermissions: hasPermission
          ? currentForm.selectedPermissions.filter((item) => item !== permission)
          : [...currentForm.selectedPermissions, permission],
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (name.length < 2) {
      setMessage("Enter a full name with at least 2 characters.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Enter a valid email address.");
      return;
    }

    const currentUsers = readStoredUsers();
    const duplicateUser = currentUsers.find(
      (user) => user.email.toLowerCase() === email,
    );

    if (duplicateUser) {
      setMessage(`${duplicateUser.email} already exists in the directory.`);
      return;
    }

    const nextUser: UserRecord = {
      name,
      email,
      role: form.role,
      team: form.team,
      status: form.sendInvite ? "Pending" : "Active",
      lastLogin: form.sendInvite ? "Invite sent" : "New account",
      permissions: form.selectedPermissions,
      inviteSent: form.sendInvite,
    };

    window.localStorage.setItem(
      usersStorageKey,
      JSON.stringify([...currentUsers, nextUser]),
    );

    setMessage(`${name} created. Returning to the user directory.`);
    window.setTimeout(() => router.push("/users"), 350);
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 sm:px-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          href="/users"
        >
          Back to Users
        </Link>

        <div className="mt-5">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            User Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Add User
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Create a user profile, assign a role, and choose initial access
            permissions.
          </p>
        </div>
      </section>

      <form
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        onSubmit={handleSubmit}
      >
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-normal">
            Profile Details
          </h2>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Full Name
              </span>
              <input
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                autoComplete="name"
                maxLength={60}
                minLength={2}
                name="name"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    name: event.target.value,
                  }))
                }
                pattern="[A-Za-z][A-Za-z .'-]*"
                required
                title="Enter a valid full name using letters, spaces, apostrophes, periods, or hyphens."
                type="text"
                value={form.name}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Email Address
              </span>
              <input
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                autoComplete="email"
                maxLength={120}
                name="email"
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    email: event.target.value,
                  }))
                }
                required
                type="email"
                value={form.email}
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Role
                </span>
                <select
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="role"
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      role: event.target.value as UserRole,
                    }))
                  }
                  value={form.role}
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Team
                </span>
                <select
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="team"
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      team: event.target.value as UserTeam,
                    }))
                  }
                  value={form.team}
                >
                  {teams.map((team) => (
                    <option key={team}>{team}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-normal">
            Access Controls
          </h2>

          <div className="mt-6 grid gap-4">
            {permissions.map((permission) => (
              <label
                className="flex items-center gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700"
                key={permission}
              >
                <input
                  checked={form.selectedPermissions.includes(permission)}
                  className="size-4 rounded border-slate-300 accent-slate-950"
                  onChange={() => togglePermission(permission)}
                  type="checkbox"
                />
                {permission}
              </label>
            ))}
          </div>

          <label className="mt-6 flex items-center gap-3 text-sm font-semibold text-slate-700">
            <input
              checked={form.sendInvite}
              className="size-4 rounded border-slate-300 accent-slate-950"
              onChange={(event) =>
                setForm((currentForm) => ({
                  ...currentForm,
                  sendInvite: event.target.checked,
                }))
              }
              type="checkbox"
            />
            Send invitation email
          </label>

          <p className="mt-6 rounded-md bg-slate-50 px-3 py-2 text-sm font-medium leading-6 text-slate-600">
            {message}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="h-12 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              type="submit"
            >
              Create User
            </button>
            <Link
              className="grid h-12 place-items-center rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              href="/users"
            >
              Cancel
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}
