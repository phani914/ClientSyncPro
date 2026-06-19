import { findByEmail, getApiState } from "@/lib/api-store";
import type { UserRecord } from "@/components/users/user-data";

export async function GET() {
  return Response.json({ data: getApiState().users });
}

export async function POST(request: Request) {
  const nextUser = (await request.json()) as UserRecord;
  const state = getApiState();

  if (!nextUser.name || !nextUser.email) {
    return Response.json({ error: "User name and email are required." }, { status: 400 });
  }

  if (findByEmail(state.users, nextUser.email)) {
    return Response.json({ error: "User already exists." }, { status: 409 });
  }

  state.users = [...state.users, nextUser];
  return Response.json({ data: nextUser }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { email, updates } = (await request.json()) as {
    email?: string;
    updates?: Partial<UserRecord>;
  };
  const state = getApiState();

  if (!email || !updates) {
    return Response.json({ error: "User email and updates are required." }, { status: 400 });
  }

  const user = findByEmail(state.users, email);

  if (!user) {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  const nextUser = { ...user, ...updates };
  state.users = state.users.map((item) =>
    item.email.toLowerCase() === email.toLowerCase() ? nextUser : item,
  );

  return Response.json({ data: nextUser });
}
