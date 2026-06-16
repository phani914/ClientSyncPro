import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";
import { UsersManagement } from "@/components/users/users-management";

export default function UsersPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="users" />
      <UsersManagement />
    </main>
  );
}
