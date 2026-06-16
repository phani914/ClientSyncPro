import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";
import { ProjectsManagement } from "@/components/projects/projects-management";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="projects" />
      <ProjectsManagement />
    </main>
  );
}
