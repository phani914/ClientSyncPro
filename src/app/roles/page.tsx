import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";
import { RoleManagement } from "@/components/roles/role-management";

export default function RolesPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="roles" />
      <RoleManagement />
    </main>
  );
}
