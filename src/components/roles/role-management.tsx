"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";

type Role = {
  name: string;
  type: "System" | "Custom";
  users: number;
  scope: string;
  review: "Monthly" | "Quarterly" | "Biannual";
  status: "Active" | "Draft" | "Protected" | "Review Due";
};

type ReviewItem = {
  role: string;
  detail: string;
  due: string;
};

type RoleTemplate = (typeof roleTemplates)[number];

type RoleForm = {
  roleName: string;
  template: RoleTemplate;
  reviewCycle: Role["review"];
};

const initialRoles: Role[] = [
  {
    name: "Admin",
    type: "System",
    users: 8,
    scope: "Full workspace",
    review: "Quarterly",
    status: "Protected",
  },
  {
    name: "Manager",
    type: "System",
    users: 22,
    scope: "Client and project teams",
    review: "Quarterly",
    status: "Active",
  },
  {
    name: "Analyst",
    type: "Custom",
    users: 31,
    scope: "Reports and compliance",
    review: "Monthly",
    status: "Active",
  },
  {
    name: "Support",
    type: "System",
    users: 18,
    scope: "Client support queue",
    review: "Quarterly",
    status: "Active",
  },
  {
    name: "Auditor",
    type: "Custom",
    users: 6,
    scope: "Read-only compliance",
    review: "Monthly",
    status: "Review Due",
  },
];

const permissionMatrix = [
  {
    area: "Client Records",
    admin: "Full",
    manager: "Edit",
    analyst: "View",
    support: "View",
    auditor: "View",
  },
  {
    area: "Projects",
    admin: "Full",
    manager: "Edit",
    analyst: "View",
    support: "Comment",
    auditor: "View",
  },
  {
    area: "Financial Reports",
    admin: "Full",
    manager: "View",
    analyst: "Export",
    support: "None",
    auditor: "View",
  },
  {
    area: "Compliance Logs",
    admin: "Full",
    manager: "View",
    analyst: "Edit",
    support: "None",
    auditor: "Export",
  },
  {
    area: "System Settings",
    admin: "Full",
    manager: "None",
    analyst: "None",
    support: "None",
    auditor: "None",
  },
];

const initialReviewQueue: ReviewItem[] = [
  {
    role: "Auditor",
    detail: "Confirm export access for external audit cycle",
    due: "Jun 18",
  },
  {
    role: "Analyst",
    detail: "Review report download permissions for compliance team",
    due: "Jun 21",
  },
  {
    role: "Manager",
    detail: "Validate client ownership transfer permissions",
    due: "Jun 25",
  },
];

const roleTemplates = [
  "Client Success Lead",
  "Compliance Reviewer",
  "Read-only Partner",
] as const;

const templateScopes: Record<RoleTemplate, string> = {
  "Client Success Lead": "Client and project teams",
  "Compliance Reviewer": "Reports and compliance",
  "Read-only Partner": "Read-only compliance",
};

const emptyForm: RoleForm = {
  roleName: "",
  template: roleTemplates[0],
  reviewCycle: "Quarterly",
};

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [reviewQueue, setReviewQueue] =
    useState<ReviewItem[]>(initialReviewQueue);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [message, setMessage] = useState("Ready to create a role draft.");
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const filteredRoles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return roles;
    }

    return roles.filter((role) =>
      [role.name, role.type, role.scope, role.review, role.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, roles]);

  const roleSummary = useMemo(
    () => [
      { label: "Active Roles", value: String(roles.length) },
      {
        label: "Custom Roles",
        value: String(roles.filter((role) => role.type === "Custom").length),
      },
      {
        label: "Assigned Users",
        value: String(roles.reduce((total, role) => total + role.users, 0)),
      },
      { label: "Pending Reviews", value: String(reviewQueue.length) },
    ],
    [reviewQueue.length, roles],
  );

  function focusRoleForm(nextMessage: string) {
    setMessage(nextMessage);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => nameInputRef.current?.focus(), 250);
  }

  function handleCreateRole() {
    setEditingRole(null);
    setForm(emptyForm);
    focusRoleForm("Enter a role name, choose a template, then save the draft.");
  }

  function handleEditRole(role: Role) {
    const matchedTemplate =
      roleTemplates.find((template) => templateScopes[template] === role.scope) ??
      roleTemplates[0];

    setEditingRole(role.name);
    setForm({
      roleName: role.name,
      template: matchedTemplate,
      reviewCycle: role.review,
    });
    focusRoleForm(`Editing ${role.name}. Save changes when ready.`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const roleName = form.roleName.trim();

    if (roleName.length < 2) {
      setMessage("Role name needs at least 2 characters.");
      nameInputRef.current?.focus();
      return;
    }

    const duplicateRole = roles.find(
      (role) =>
        role.name.toLowerCase() === roleName.toLowerCase() &&
        role.name !== editingRole,
    );

    if (duplicateRole) {
      setMessage(`${duplicateRole.name} already exists. Choose another name.`);
      nameInputRef.current?.focus();
      return;
    }

    const nextRole: Role = {
      name: roleName,
      type: "Custom",
      users: editingRole
        ? roles.find((role) => role.name === editingRole)?.users ?? 0
        : 0,
      scope: templateScopes[form.template],
      review: form.reviewCycle,
      status: "Draft",
    };

    setRoles((currentRoles) => {
      if (!editingRole) {
        return [...currentRoles, nextRole];
      }

      return currentRoles.map((role) =>
        role.name === editingRole ? nextRole : role,
      );
    });

    setReviewQueue((currentQueue) => {
      const filteredQueue = currentQueue.filter(
        (item) => item.role !== roleName && item.role !== editingRole,
      );

      return [
        {
          role: roleName,
          detail: `Finalize ${roleName} permissions before activation`,
          due: "Draft",
        },
        ...filteredQueue,
      ];
    });

    setEditingRole(null);
    setForm(emptyForm);
    setMessage(`${roleName} saved as a draft and added to the review queue.`);
  }

  function handleCompleteReview(roleName: string) {
    setReviewQueue((currentQueue) =>
      currentQueue.filter((item) => item.role !== roleName),
    );
    setRoles((currentRoles) =>
      currentRoles.map((role) =>
        role.name === roleName && role.status !== "Protected"
          ? { ...role, status: "Active" }
          : role,
      ),
    );
    setMessage(`${roleName} review marked complete.`);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-4 px-3 py-4 sm:gap-6 sm:px-6 sm:py-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
            Access Control
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
            Role Management
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
            Define role scopes, compare permissions, and keep access reviews
            moving across every ClientSync Pro team.
          </p>
        </div>

        <button
          className="h-11 w-full rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
          onClick={handleCreateRole}
          type="button"
        >
          Create Role
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {roleSummary.map((item) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            key={item.label}
          >
            <p className="text-sm font-semibold text-slate-500">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-normal sm:mt-4 sm:text-4xl">
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
            <h2 className="text-lg font-semibold tracking-normal">
              Role Directory
            </h2>
            <input
              aria-label="Search roles"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 sm:max-w-xs"
              maxLength={80}
              minLength={2}
              name="roleSearch"
              onChange={(event) => setQuery(event.target.value)}
              pattern="[A-Za-z0-9 .'-]*"
              placeholder="Search roles"
              title="Enter at least 2 letters or numbers to search roles."
              type="search"
              value={query}
            />
          </div>

          <div className="grid gap-3 p-3 md:hidden">
            {filteredRoles.map((role) => (
              <article
                className="rounded-lg border border-slate-200 p-4"
                key={role.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {role.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {role.scope}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {role.status}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Type
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {role.type}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Users
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {role.users}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">
                      Review
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900">
                      {role.review}
                    </dd>
                  </div>
                </dl>

                <button
                  className="mt-4 h-10 w-full rounded-md border border-slate-300 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                  onClick={() => handleEditRole(role)}
                  type="button"
                >
                  Edit
                </button>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Users</th>
                  <th className="px-5 py-3 font-semibold">Scope</th>
                  <th className="px-5 py-3 font-semibold">Review</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRoles.map((role) => (
                  <tr className="transition hover:bg-slate-50" key={role.name}>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {role.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{role.type}</td>
                    <td className="px-5 py-4 text-slate-600">{role.users}</td>
                    <td className="px-5 py-4 text-slate-600">{role.scope}</td>
                    <td className="px-5 py-4 text-slate-600">{role.review}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {role.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                        onClick={() => handleEditRole(role)}
                        type="button"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRoles.length === 0 ? (
            <div className="m-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
              <p className="text-sm font-semibold text-slate-900">
                No roles found
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Try a different role name, type, scope, review, or status.
              </p>
            </div>
          ) : null}
        </article>

        <aside className="grid gap-6">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold tracking-normal">
              {editingRole ? "Edit Role" : "New Role"}
            </h2>

            <form className="mt-5 grid gap-4" onSubmit={handleSubmit} ref={formRef}>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Role Name
                </span>
                <input
                  className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  maxLength={50}
                  minLength={2}
                  name="roleName"
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      roleName: event.target.value,
                    }))
                  }
                  pattern="[A-Za-z][A-Za-z .'-]*"
                  placeholder="Compliance Reviewer"
                  ref={nameInputRef}
                  required
                  title="Use letters, spaces, apostrophes, periods, or hyphens."
                  type="text"
                  value={form.roleName}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Start From Template
                </span>
                <select
                  className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="template"
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      template: event.target.value as RoleTemplate,
                    }))
                  }
                  value={form.template}
                >
                  {roleTemplates.map((template) => (
                    <option key={template}>{template}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Review Cycle
                </span>
                <select
                  className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="reviewCycle"
                  onChange={(event) =>
                    setForm((currentForm) => ({
                      ...currentForm,
                      reviewCycle: event.target.value as Role["review"],
                    }))
                  }
                  value={form.reviewCycle}
                >
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Biannual</option>
                </select>
              </label>

              <p className="rounded-md bg-slate-50 px-3 py-2 text-sm font-medium leading-6 text-slate-600">
                {message}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  className="h-11 rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                  type="submit"
                >
                  {editingRole ? "Save Changes" : "Save Draft"}
                </button>
                <button
                  className="h-11 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                  onClick={handleCreateRole}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </form>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold tracking-normal">
              Review Queue
            </h2>

            <div className="mt-5 grid gap-3">
              {reviewQueue.map((item) => (
                <div
                  className="rounded-md border border-slate-200 p-4"
                  key={`${item.role}-${item.detail}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{item.role}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.due}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    {item.detail}
                  </p>
                  <button
                    className="mt-3 rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                    onClick={() => handleCompleteReview(item.role)}
                    type="button"
                  >
                    Mark Complete
                  </button>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
          <div>
            <h2 className="text-lg font-semibold tracking-normal">
              Permission Matrix
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Compare access levels before assigning or editing a role.
            </p>
          </div>
          <Link
            className="grid h-10 w-full place-items-center rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
            href="/users"
          >
            View Users
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Permission Area</th>
                <th className="px-5 py-3 font-semibold">Admin</th>
                <th className="px-5 py-3 font-semibold">Manager</th>
                <th className="px-5 py-3 font-semibold">Analyst</th>
                <th className="px-5 py-3 font-semibold">Support</th>
                <th className="px-5 py-3 font-semibold">Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionMatrix.map((row) => (
                <tr className="transition hover:bg-slate-50" key={row.area}>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {row.area}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{row.admin}</td>
                  <td className="px-5 py-4 text-slate-600">{row.manager}</td>
                  <td className="px-5 py-4 text-slate-600">{row.analyst}</td>
                  <td className="px-5 py-4 text-slate-600">{row.support}</td>
                  <td className="px-5 py-4 text-slate-600">{row.auditor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
