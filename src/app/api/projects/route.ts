import { findByName, getApiState } from "@/lib/api-store";
import type { ProjectRecord } from "@/components/projects/project-data";

export async function GET() {
  return Response.json({ data: getApiState().projects });
}

export async function POST(request: Request) {
  const nextProject = (await request.json()) as ProjectRecord;
  const state = getApiState();

  if (!nextProject.name || !nextProject.client) {
    return Response.json({ error: "Project name and client are required." }, { status: 400 });
  }

  if (findByName(state.projects, nextProject.name)) {
    return Response.json({ error: "Project already exists." }, { status: 409 });
  }

  state.projects = [...state.projects, nextProject];
  return Response.json({ data: nextProject }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { name, updates } = (await request.json()) as {
    name?: string;
    updates?: Partial<ProjectRecord>;
  };
  const state = getApiState();

  if (!name || !updates) {
    return Response.json({ error: "Project name and updates are required." }, { status: 400 });
  }

  const project = findByName(state.projects, name);

  if (!project) {
    return Response.json({ error: "Project not found." }, { status: 404 });
  }

  const nextProject = { ...project, ...updates };
  state.projects = state.projects.map((item) =>
    item.name.toLowerCase() === name.toLowerCase() ? nextProject : item,
  );

  return Response.json({ data: nextProject });
}
