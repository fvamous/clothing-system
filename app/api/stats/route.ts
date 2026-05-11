import { getStats } from "@/lib/services/stats.service";

export async function GET() {
  const data = await getStats();
  return Response.json(data);
}