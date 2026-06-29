export async function GET() {
  return Response.json({
    data: {
      service: "clientsync-pro",
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  });
}
