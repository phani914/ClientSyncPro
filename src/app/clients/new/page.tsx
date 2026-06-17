import { NewClientForm } from "@/components/clients/new-client-form";
import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";

export default function NewClientPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="clients" />
      <NewClientForm />
    </main>
  );
}
