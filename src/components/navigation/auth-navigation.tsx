import Link from "next/link";

type AuthNavigationProps = {
  active: "login" | "forgot-password";
};

const links = [
  { href: "/", label: "Login", key: "login" },
  { href: "/forgot-password", label: "Reset Password", key: "forgot-password" },
] as const;

export function AuthNavigation({ active }: AuthNavigationProps) {
  return (
    <nav
      aria-label="Account navigation"
      className="flex justify-center gap-2 border-b border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
    >
      {links.map((link) => {
        const isActive = active === link.key;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md px-3 py-2 transition ${
              isActive
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
            href={link.href}
            key={link.key}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
