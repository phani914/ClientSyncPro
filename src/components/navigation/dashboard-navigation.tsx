import Image from "next/image";
import Link from "next/link";

type DashboardNavigationProps = {
  active?:
    | "dashboard"
    | "clients"
    | "projects"
    | "users"
    | "roles"
    | "reports"
    | "settings";
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", key: "dashboard" },
  { href: "/clients", label: "Clients", key: "clients" },
  { href: "/projects", label: "Projects", key: "projects" },
  { href: "/users", label: "Users", key: "users" },
  { href: "/roles", label: "Roles", key: "roles" },
  { href: "/reports", label: "Reports", key: "reports" },
  { href: "/settings", label: "Settings", key: "settings" },
  { href: "/", label: "Logout", key: "logout" },
] as const;

export function DashboardNavigation({
  active = "dashboard",
}: DashboardNavigationProps) {
  return (
    <aside
      className="border-b border-slate-200 bg-[#111820] px-4 py-3 shadow-sm lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:border-slate-800 lg:px-4 lg:py-5"
      data-dashboard-sidebar
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 lg:mx-0 lg:h-full lg:items-stretch">
        <Link
          aria-label="ClientSync Pro dashboard"
          className="self-center rounded-md focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#111820] lg:self-start"
          href="/dashboard"
        >
          <Image
            className="h-16 w-48 object-cover lg:h-20 lg:w-56"
            src="/client-pro-logo.png"
            alt="ClientSync Pro"
            width={1536}
            height={1024}
            priority
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex w-full gap-2 overflow-x-auto pb-1 text-sm font-semibold text-slate-100 lg:mt-5 lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {navItems.map((item) => {
            const isActive = active === item.key;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-md px-3 py-2 transition lg:flex lg:h-11 lg:items-center ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "text-slate-100 hover:bg-white/10 focus:bg-white/10"
                }`}
                href={item.href}
                key={item.key}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
