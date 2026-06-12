import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
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

        <div className="flex flex-1 items-center px-7 py-9">
          <form className="w-full" action="/">
            <h1 className="text-center text-3xl font-semibold tracking-normal">
              Forgot Password
            </h1>
            <p className="mt-4 text-center text-sm font-medium leading-6 text-slate-600">
              Enter your registered email address and we will send password
              reset details.
            </p>

            <label className="mt-10 grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Email Address
              </span>
              <input
                className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>

            <button
              className="mt-8 h-12 w-full rounded-md bg-slate-950 px-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              type="submit"
            >
              SEND DETAILS
            </button>

            <div className="mt-7 text-center">
              <Link
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                href="/"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
