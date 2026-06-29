import Image from "next/image";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthNavigation } from "@/components/navigation/auth-navigation";

export default function ForgotPassword() {
  return (
    <main className="min-h-screen bg-[#eef3f8] px-4 py-8 text-slate-950 sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 bg-[#101820] px-7 py-5">
          <Image
            className="mx-auto h-24 w-full max-w-[320px] object-cover"
            src="/client-pro-logo-640.jpg"
            alt="ClientSync Pro"
            width={640}
            height={426}
            sizes="320px"
            priority
          />
        </header>
        <AuthNavigation active="forgot-password" />

        <div className="flex flex-1 items-center px-7 py-9">
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}
