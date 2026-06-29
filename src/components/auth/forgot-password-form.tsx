"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Enter your registered email address and we will send password reset details.",
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!emailPattern.test(normalizedEmail)) {
      setIsSubmitted(false);
      setMessage("Enter a valid email address to receive reset details.");
      return;
    }

    setIsSubmitted(true);
    setMessage(`Reset details are ready to send to ${normalizedEmail}.`);
  }

  return (
    <form className="w-full" noValidate onSubmit={handleSubmit}>
      <h1 className="text-center text-3xl font-semibold tracking-normal">
        Forgot Password
      </h1>
      <p className="mt-4 text-center text-sm font-medium leading-6 text-slate-600">
        {message}
      </p>

      <label className="mt-10 grid gap-2">
        <span className="text-sm font-semibold text-slate-700">
          Email Address
        </span>
        <input
          aria-describedby="password-reset-message"
          className="h-12 rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          name="email"
          type="email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          value={email}
        />
      </label>

      <p
        className={`mt-4 rounded-md px-3 py-2 text-sm font-semibold ${
          isSubmitted
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-50 text-slate-600"
        }`}
        id="password-reset-message"
        role="status"
      >
        {isSubmitted
          ? "For UAT, no email is sent. Use the login credentials to continue."
          : "Password reset delivery is simulated in this UAT build."}
      </p>

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
  );
}
