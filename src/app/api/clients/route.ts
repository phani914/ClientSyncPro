import { findByName, getApiState } from "@/lib/api-store";
import type { ClientRecord } from "@/components/clients/client-data";

export async function GET() {
  return Response.json({ data: getApiState().clients });
}

export async function POST(request: Request) {
  const nextClient = (await request.json()) as ClientRecord;
  const state = getApiState();

  if (!nextClient.name || !nextClient.contactEmail) {
    return Response.json({ error: "Client name and email are required." }, { status: 400 });
  }

  if (findByName(state.clients, nextClient.name)) {
    return Response.json({ error: "Client already exists." }, { status: 409 });
  }

  state.clients = [...state.clients, nextClient];
  return Response.json({ data: nextClient }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { name, updates } = (await request.json()) as {
    name?: string;
    updates?: Partial<ClientRecord>;
  };
  const state = getApiState();

  if (!name || !updates) {
    return Response.json({ error: "Client name and updates are required." }, { status: 400 });
  }

  const client = findByName(state.clients, name);

  if (!client) {
    return Response.json({ error: "Client not found." }, { status: 404 });
  }

  const nextClient = { ...client, ...updates };
  state.clients = state.clients.map((item) =>
    item.name.toLowerCase() === name.toLowerCase() ? nextClient : item,
  );

  return Response.json({ data: nextClient });
}

export async function DELETE(request: Request) {
  const { name } = (await request.json()) as { name?: string };
  const state = getApiState();

  if (!name) {
    return Response.json({ error: "Client name is required." }, { status: 400 });
  }

  state.clients = state.clients.filter(
    (client) => client.name.toLowerCase() !== name.toLowerCase(),
  );

  return Response.json({ data: state.clients });
}
