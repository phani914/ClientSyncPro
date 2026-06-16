import { DashboardNavigation } from "@/components/navigation/dashboard-navigation";
import { NewProjectForm } from "@/components/projects/new-project-form";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-[#eef3f8] text-slate-950">
      <DashboardNavigation active="projects" />
      <NewProjectForm />
    </main>
  );
}
