import Image from "next/image";

export default function Home() {
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
          <form className="w-full" action="/dashboard">
            <h1 className="text-center text-3xl font-semibold tracking-normal">
              Welcome Back
            </h1>

            <div className="mt-10 grid gap-6">
              <label className="grid gap-2">
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

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Password
                </span>
                <input
                  className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </label>
            </div>

            <label className="mt-6 flex w-fit items-center gap-3 text-sm font-medium text-slate-700">
              <input
                className="size-4 rounded border-slate-300 accent-slate-950"
                name="remember"
                type="checkbox"
              />
              Remember Me
            </label>

            <button
              className="mt-8 h-12 w-full rounded-md bg-slate-950 px-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
              type="submit"
            >
              LOGIN
            </button>

            <div className="mt-7 text-center">
              <a
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
