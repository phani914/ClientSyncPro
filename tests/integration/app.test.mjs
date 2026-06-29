import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { spawn } from "node:child_process";
import { after, before, describe, it } from "node:test";

const AUTH_SECRET = "clientsync-integration-test-secret";
const SESSION_COOKIE_NAME = "clientsync_session";
const port = 3200 + Math.floor(Math.random() * 1000);
const baseUrl = `http://127.0.0.1:${port}`;

let server;
let serverOutput = "";

function sign(value) {
  return createHmac("sha256", AUTH_SECRET).update(value).digest("base64url");
}

function createSessionCookie() {
  const payload = Buffer.from(
    JSON.stringify({
      email: "admin@clientsync.pro",
      name: "ClientSync Admin",
      issuedAt: Date.now(),
    }),
  ).toString("base64url");

  return `${SESSION_COOKIE_NAME}=${payload}.${sign(payload)}`;
}

async function request(path, init) {
  return fetch(`${baseUrl}${path}`, init);
}

async function requestJson(path, init) {
  const response = await request(path, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const payload = await response.json();

  return { payload, response };
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  let lastError;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next dev server exited early.\n${serverOutput}`);
    }

    try {
      const response = await request("/", { redirect: "manual" });

      if (response.status < 500) {
        return;
      }
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(
    `Timed out waiting for Next dev server. ${
      lastError instanceof Error ? lastError.message : ""
    }\n${serverOutput}`,
  );
}

before(async () => {
  server = spawn(
    "npm",
    ["run", "start", "--", "--port", String(port), "--hostname", "127.0.0.1"],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        AUTH_SECRET,
        AUTH_EMAIL: "admin@clientsync.pro",
        AUTH_PASSWORD: "ClientSync@123",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  await waitForServer();
});

after(async () => {
  if (!server || server.exitCode !== null) {
    return;
  }

  server.kill("SIGTERM");

  await new Promise((resolve) => {
    server.once("exit", resolve);
    setTimeout(resolve, 2_000);
  });
});

describe("ClientSync integration", () => {
  it("serves health status for deployment monitoring", async () => {
    const { payload, response } = await requestJson("/api/health");

    assert.equal(response.status, 200);
    assert.equal(payload.data.service, "clientsync-pro");
    assert.equal(payload.data.status, "ok");
    assert.match(payload.data.timestamp, /^\d{4}-\d{2}-\d{2}T/);
  });

  it("sets baseline production security headers", async () => {
    const response = await request("/");

    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.equal(
      response.headers.get("referrer-policy"),
      "strict-origin-when-cross-origin",
    );
    assert.equal(response.headers.get("x-powered-by"), null);
  });

  it("redirects unauthenticated dashboard requests to login", async () => {
    const response = await request("/dashboard", { redirect: "manual" });

    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "/");
  });

  it("serves protected dashboard content with a valid session cookie", async () => {
    const response = await request("/dashboard", {
      headers: { Cookie: createSessionCookie() },
    });

    assert.equal(response.status, 200);
    assert.match(await response.text(), /Project Health Summary/);
  });

  it("redirects authenticated login-page requests to the dashboard", async () => {
    const response = await request("/", {
      headers: { Cookie: createSessionCookie() },
      redirect: "manual",
    });

    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "/dashboard");
  });

  it("creates, updates, rejects duplicates, and deletes a client through the API", async () => {
    const clientName = `Integration Client ${Date.now()}`;

    const createResult = await requestJson("/api/clients", {
      method: "POST",
      body: JSON.stringify({
        name: clientName,
        owner: "Priya Shah",
        status: "Onboarding",
        plan: "Professional",
        projects: 0,
        lastContact: "Today",
        contactName: "Integration Tester",
        contactEmail: "integration.tester@example.com",
        notes: "Created by the integration test suite.",
      }),
    });

    assert.equal(createResult.response.status, 201);
    assert.equal(createResult.payload.data.name, clientName);

    const duplicateResult = await requestJson("/api/clients", {
      method: "POST",
      body: JSON.stringify({
        name: clientName,
        contactEmail: "duplicate@example.com",
      }),
    });

    assert.equal(duplicateResult.response.status, 409);
    assert.equal(duplicateResult.payload.error, "Client already exists.");

    const updateResult = await requestJson("/api/clients", {
      method: "PATCH",
      body: JSON.stringify({
        name: clientName,
        updates: { status: "Active", lastContact: "Today" },
      }),
    });

    assert.equal(updateResult.response.status, 200);
    assert.equal(updateResult.payload.data.status, "Active");

    const deleteResult = await requestJson("/api/clients", {
      method: "DELETE",
      body: JSON.stringify({ name: clientName }),
    });

    assert.equal(deleteResult.response.status, 200);
    assert.equal(
      deleteResult.payload.data.some((client) => client.name === clientName),
      false,
    );
  });

  it("validates project API payloads before mutating state", async () => {
    const badCreate = await requestJson("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name: "", client: "" }),
    });

    assert.equal(badCreate.response.status, 400);
    assert.equal(
      badCreate.payload.error,
      "Project name and client are required.",
    );
  });
});
