"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/app/auth/actions";

const initialState: LoginActionState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
  const errors = state.fieldErrors ?? {};

  return (
    <form className="w-full" noValidate action={formAction}>
      <h1 className="text-center text-3xl font-semibold tracking-normal">
        Welcome Back
      </h1>

      {state.formError ? (
        <div
          className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          role="alert"
        >
          {state.formError}
        </div>
      ) : null}

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
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-invalid={Boolean(errors.password)}
            className={`h-12 rounded-md border bg-white px-4 text-base outline-none transition focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:border-red-600 focus:ring-red-600/10"
                : "border-slate-300 focus:border-slate-950 focus:ring-slate-950/10"
            }`}
            name="password"
            type="password"
            autoComplete="current-password"
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
        className="mt-8 h-12 w-full rounded-md bg-slate-950 px-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "LOGGING IN..." : "LOGIN"}
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
  );
}
