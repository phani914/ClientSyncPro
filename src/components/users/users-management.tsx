"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiGet, apiSend } from "@/lib/browser-api";
import {
  initialUsers,
  permissionGroups,
  UserRecord,
} from "./user-data";

export function UsersManagement() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("User directory ready.");

  useEffect(() => {
    let isMounted = true;

    apiGet<UserRecord[]>("/api/users")
      .then((nextUsers) => {
        if (isMounted) {
          setUsers(nextUsers);
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

  function persistUsers(nextUsers: UserRecord[]) {
    setUsers(nextUsers);
  }

  async function updateStatus(email: string, status: UserRecord["status"]) {
    const nextUsers = users.map((user) =>
      user.email === email
        ? {
            ...user,
            status,
            lastLogin: status === "Pending" ? "Invite sent" : user.lastLogin,
          }
        : user,
    );
    const changedUser = users.find((user) => user.email === email);

    persistUsers(nextUsers);
    try {
      await apiSend<UserRecord>("/api/users", "PATCH", {
        email,
        updates: {
          status,
          lastLogin: status === "Pending" ? "Invite sent" : changedUser?.lastLogin,
        },
      });
      setMessage(
        changedUser
          ? `${changedUser.name} marked ${status.toLowerCase()}.`
          : "User status updated.",
      );
    } catch (error) {
      setUsers(users);
      setMessage(error instanceof Error ? error.message : "User update failed.");
    }
  }

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return users;
    }

    return users.filter((user) =>
      [user.name, user.email, user.role, user.team, user.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, users]);

  const userSummary = useMemo(
    () => [
      { label: "Total Users", value: String(users.length) },
      {
        label: "Admins",
        value: String(users.filter((user) => user.role === "Admin").length),
      },
      {
        label: "Pending Invites",
        value: String(users.filter((user) => user.status === "Pending").length),
      },
      {
        label: "Suspended",
        value: String(users.filter((user) => user.status === "Suspended").length),
      },
    ],
    [users],
  );

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-3 py-4 sm:gap-6 sm:px-6 sm:py-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            User Management
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">Users</h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Manage account access, user roles, team ownership, and permission
            levels across ClientSync Pro.
          </p>
        </div>

        <Link
          className="grid h-11 w-full place-items-center rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
          href="/users/new"
        >
          Add User
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {userSummary.map((item) => (
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

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
            <div>
              <h2 className="text-lg font-semibold tracking-normal">
                User Directory
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {message}
              </p>
            </div>
            <input
              aria-label="Search users"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:max-w-xs"
              maxLength={80}
              minLength={2}
              name="userSearch"
              onChange={(event) => setQuery(event.target.value)}
              pattern="[A-Za-z0-9 .@'-]*"
              placeholder="Search users"
              title="Enter at least 2 letters or numbers to search users."
              type="search"
              value={query}
            />
          </div>

          <div className="grid gap-3 p-3 md:hidden">
            {filteredUsers.map((user) => (
              <article
                className="rounded-lg border border-slate-200 p-4"
                key={user.email}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {user.name}
                    </h3>
                    <p className="mt-1 break-words text-xs font-medium text-slate-500">
                      {user.email}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {user.status}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Role
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {user.role}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Team
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {user.team}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Last Login
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {user.lastLogin}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    className="h-10 rounded-md border border-slate-300 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={user.status === "Active"}
                    onClick={() => updateStatus(user.email, "Active")}
                    type="button"
                  >
                    Activate
                  </button>
                  <button
                    className="h-10 rounded-md border border-slate-300 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={user.status === "Suspended"}
                    onClick={() => updateStatus(user.email, "Suspended")}
                    type="button"
                  >
                    Suspend
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1040px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Team</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Last Login</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr className="transition hover:bg-slate-50" key={user.email}>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {user.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{user.email}</td>
                    <td className="px-5 py-4 text-slate-600">{user.role}</td>
                    <td className="px-5 py-4 text-slate-600">{user.team}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {user.lastLogin}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
                          disabled={user.status === "Active"}
                          onClick={() => updateStatus(user.email, "Active")}
                          type="button"
                        >
                          Activate
                        </button>
                        <button
                          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
                          disabled={user.status === "Suspended"}
                          onClick={() => updateStatus(user.email, "Suspended")}
                          type="button"
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="m-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
              <p className="text-sm font-semibold text-slate-900">
                No users found
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Try a different name, email, role, team, or status.
              </p>
            </div>
          ) : null}
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-normal">
              Role Permissions
            </h2>
            <Link
              className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              href="/roles"
            >
              Manage
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {permissionGroups.map((group) => (
              <div
                className="rounded-md border border-slate-200 p-4"
                key={group.label}
              >
                <p className="font-semibold text-slate-900">{group.label}</p>
                <div className="mt-3 grid gap-2 text-xs font-semibold text-slate-600 sm:grid-cols-3">
                  <span>Admin: {group.admins}</span>
                  <span>Manager: {group.managers}</span>
                  <span>Support: {group.support}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
