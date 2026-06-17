import { ClientsManagement } from "@/components/clients/clients-management";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="clients" />
      <ClientsManagement />
    </main>
  );
}
