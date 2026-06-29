"use client";

import { useState } from "react";

export function SaveSettingsButton() {
  const [message, setMessage] = useState("Settings changes are ready to save.");

  function handleClick() {
    setMessage("Settings saved for this UAT session.");
  }

  return (
    <div className="mt-8 grid gap-3">
      <button
        className="h-12 w-full rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        onClick={handleClick}
        type="button"
      >
        Save Settings
      </button>
      <p
        className="rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600"
        role="status"
      >
        {message}
      </p>
    </div>
  );
}
