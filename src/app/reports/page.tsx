import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";
import { ReportsManagement } from "@/components/reports/reports-management";

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="reports" />
      <ReportsManagement />
    </main>
  );
}
