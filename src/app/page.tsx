import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { AuthNavigation } from "@/components/navigation/auth-navigation";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#eef3f8] px-4 py-8 text-slate-950 sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 bg-[#101820] px-7 py-5">
          <Image
            className="mx-auto h-24 w-full max-w-[320px] object-cover"
            src="/client-pro-logo.png"
            alt="ClientSync Pro"
            width={1536}
            height={1024}
            priority
          />
        </header>
        <AuthNavigation active="login" />

        <div className="flex flex-1 items-center px-7 py-9">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
