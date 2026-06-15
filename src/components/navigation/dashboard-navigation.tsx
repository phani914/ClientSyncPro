import Image from "next/image";
import Link from "next/link";

type DashboardNavigationProps = {
  active?: "dashboard" | "clients" | "projects" | "users" | "reports" | "settings";
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", key: "dashboard" },
  { href: "/clients", label: "Clients", key: "clients" },
  { href: "/projects", label: "Projects", key: "projects" },
  { href: "/users", label: "Users", key: "users" },
  { href: "/reports", label: "Reports", key: "reports" },
  { href: "/settings", label: "Settings", key: "settings" },
  { href: "/", label: "Logout", key: "logout" },
] as const;

export function DashboardNavigation({
  active = "dashboard",
}: DashboardNavigationProps) {
  return (
    <header className="border-b border-slate-200 bg-[#111820] px-4 py-3 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
        <Link
          aria-label="ClientSync Pro dashboard"
          className="rounded-md focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#111820]"
          href="/dashboard"
        >
          <Image
            className="h-16 w-48 object-cover sm:w-56"
            src="/client-pro-logo.png"
            alt="ClientSync Pro"
            width={1536}
            height={1024}
            priority
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex w-full justify-center gap-2 overflow-x-auto pb-1 text-sm font-semibold text-slate-100 lg:pb-0"
        >
          {navItems.map((item) => {
            const isActive = active === item.key;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-md px-3 py-2 transition ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "hover:bg-white/10 focus:bg-white/10"
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
    </header>
  );
}
