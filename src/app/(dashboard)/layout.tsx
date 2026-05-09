import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { EditTaskModal } from "@/features/tasks/components/edit-task-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";


interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps ) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_36%)]" />
            <CreateWorkspaceModal />
            <CreateProjectModal />
            <CreateTaskModal />
            <EditTaskModal />
            <div className="relative flex min-h-screen w-full">
                <div className="fixed left-0 top-0 hidden h-full w-[288px] overflow-y-auto p-4 lg:block">
                    <Sidebar />
                </div>
                <div className="w-full lg:pl-[288px]">
                    <div className="mx-auto flex h-full max-w-screen-2xl flex-col">
                        <Navbar />
                        <main className="flex h-full flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;