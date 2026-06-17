import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE_NAME = "clientsync_session";
export const SESSION_MAX_AGE = 60 * 60 * 8;

type SessionPayload = {
  email: string;
  name: string;
  issuedAt: number;
};

export type AuthSession = {
  user: {
    email: string;
    name: string;
  };
};

function getAuthSecret() {
  return (
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "clientsync-local-development-secret"
  );
}

function sign(value: string) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(value: string): SessionPayload | null {
  try {
    const payload = JSON.parse(Buffer.from(value, "base64url").toString());

    if (
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.issuedAt !== "number"
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function constantTimeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createSessionToken(user: { email: string; name: string }) {
  const encodedPayload = encodePayload({
    email: user.email,
    name: user.name,
    issuedAt: Date.now(),
  });

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function parseSessionToken(token: string | undefined): AuthSession | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  if (!constantTimeEquals(signature, sign(encodedPayload))) {
    return null;
  }

  const payload = decodePayload(encodedPayload);

  if (!payload) {
    return null;
  }

  const expiresAt = payload.issuedAt + SESSION_MAX_AGE * 1000;

  if (Date.now() > expiresAt) {
    return null;
  }

  return {
    user: {
      email: payload.email,
      name: payload.name,
    },
  };
}
