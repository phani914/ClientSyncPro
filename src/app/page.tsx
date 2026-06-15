"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthNavigation } from "@/components/navigation/auth-navigation";

type LoginErrors = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const validateLogin = () => {
    const nextErrors: LoginErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = "Email address is required.";
    } else if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateLogin()) {
      router.push("/dashboard");
    }
  };

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
          <form className="w-full" noValidate onSubmit={handleSubmit}>
            <h1 className="text-center text-3xl font-semibold tracking-normal">
              Welcome Back
            </h1>

            <div className="mt-10 grid gap-6">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Email Address
                </span>
                <input
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={Boolean(errors.email)}
                  className={`h-12 rounded-md border bg-white px-4 text-base outline-none transition focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:border-red-600 focus:ring-red-600/10"
                      : "border-slate-300 focus:border-slate-950 focus:ring-slate-950/10"
                  }`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setErrors((current) => ({ ...current, email: undefined }));
                  }}
                />
                {errors.email ? (
                  <span
                    className="text-sm font-medium text-red-600"
                    id="email-error"
                    role="alert"
                  >
                    {errors.email}
                  </span>
                ) : null}
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Password
                </span>
                <input
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  aria-invalid={Boolean(errors.password)}
                  className={`h-12 rounded-md border bg-white px-4 text-base outline-none transition focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:border-red-600 focus:ring-red-600/10"
                      : "border-slate-300 focus:border-slate-950 focus:ring-slate-950/10"
                  }`}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((current) => ({
                      ...current,
                      password: undefined,
                    }));
                  }}
                />
                {errors.password ? (
                  <span
                    className="text-sm font-medium text-red-600"
                    id="password-error"
                    role="alert"
                  >
                    {errors.password}
                  </span>
                ) : null}
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
              <Link
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
