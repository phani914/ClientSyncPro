import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";
import { NewReportForm } from "@/components/reports/new-report-form";

export default function NewReportPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="reports" />
      <NewReportForm />
    </main>
  );
}
