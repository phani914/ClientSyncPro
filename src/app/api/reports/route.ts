import { findByName, getApiState } from "@/lib/api-store";
import type { ReportRecord } from "@/components/reports/report-data";

export async function GET() {
  const state = getApiState();

  return Response.json({
    data: {
      reports: state.reports,
      exportCount: state.reportExports,
    },
  });
}

export async function POST(request: Request) {
  const nextReport = (await request.json()) as ReportRecord;
  const state = getApiState();

  if (!nextReport.name || !nextReport.category) {
    return Response.json({ error: "Report name and category are required." }, { status: 400 });
  }

  if (findByName(state.reports, nextReport.name)) {
    return Response.json({ error: "Report already exists." }, { status: 409 });
  }

  state.reports = [...state.reports, nextReport];
  return Response.json({ data: nextReport }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { name, updates } = (await request.json()) as {
    name?: string;
    updates?: Partial<ReportRecord>;
  };
  const state = getApiState();

  if (!name || !updates) {
    return Response.json({ error: "Report name and updates are required." }, { status: 400 });
  }

  const report = findByName(state.reports, name);

  if (!report) {
    return Response.json({ error: "Report not found." }, { status: 404 });
  }

  const nextReport = { ...report, ...updates };
  state.reports = state.reports.map((item) =>
    item.name.toLowerCase() === name.toLowerCase() ? nextReport : item,
  );

  return Response.json({ data: nextReport });
}

export async function DELETE(request: Request) {
  const { name } = (await request.json()) as { name?: string };
  const state = getApiState();

  if (!name) {
    return Response.json({ error: "Report name is required." }, { status: 400 });
  }

  state.reports = state.reports.filter(
    (report) => report.name.toLowerCase() !== name.toLowerCase(),
  );

  return Response.json({ data: state.reports });
}
