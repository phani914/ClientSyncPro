import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";

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
] as const;

export function DashboardNavigation({
  active = "dashboard",
}: DashboardNavigationProps) {
  return (
    <aside
      className="sticky top-0 z-40 border-b border-slate-200 bg-[#111820] px-3 py-3 shadow-sm sm:px-4 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:border-slate-800 lg:px-4 lg:py-5"
      data-dashboard-sidebar
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 lg:mx-0 lg:h-full lg:items-stretch lg:gap-4">
        <Link
          aria-label="ClientSync Pro dashboard"
          className="self-center rounded-md focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#111820] lg:self-start"
          href="/dashboard"
        >
          <Image
            className="h-12 w-40 object-cover sm:h-16 sm:w-48 lg:h-20 lg:w-56"
            src="/client-pro-logo-640.jpg"
            alt="ClientSync Pro"
            width={640}
            height={426}
            sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 160px"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex w-full gap-2 overflow-x-auto pb-1 text-sm font-semibold text-slate-100 [-webkit-overflow-scrolling:touch] lg:mt-5 lg:flex-1 lg:flex-col lg:overflow-visible lg:pb-0"
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

        <form action={logoutAction} className="w-full lg:w-auto">
          <button
            className="w-full shrink-0 rounded-md px-3 py-2 text-center text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus:bg-white/10 lg:flex lg:h-11 lg:items-center lg:text-left"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
