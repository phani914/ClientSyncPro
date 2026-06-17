import "server-only";

import { cookies } from "next/headers";
import {
  createSessionToken,
  parseSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth-token";

const DEFAULT_EMAIL = "admin@clientsync.pro";
const DEFAULT_PASSWORD = "ClientSync@123";

function getExpectedCredentials() {
  const email = process.env.AUTH_EMAIL ?? DEFAULT_EMAIL;
  const password = process.env.AUTH_PASSWORD ?? DEFAULT_PASSWORD;

  return { email, password };
}

export async function authenticate(email: string, password: string) {
  const expectedCredentials = getExpectedCredentials();

  if (process.env.NODE_ENV === "production" && !process.env.AUTH_PASSWORD) {
    return null;
  }

  if (
    email.trim().toLowerCase() !== expectedCredentials.email.toLowerCase() ||
    password !== expectedCredentials.password
  ) {
    return null;
  }

  return {
    email: expectedCredentials.email,
    name: "ClientSync Admin",
  };
}

export async function createSession(user: { email: string; name: string }) {
  const cookieStore = await cookies();
  const token = createSessionToken(user);

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();

  return parseSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}
