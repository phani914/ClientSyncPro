import { getApiState } from "@/lib/api-store";

export async function POST() {
  const state = getApiState();

  state.reportExports += 1;

  return Response.json({ data: { exportCount: state.reportExports } });
}
