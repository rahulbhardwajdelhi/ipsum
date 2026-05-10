import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
    onCancel: () => void;
};

export const CreateTaskFormWrapper = ({
    onCancel,
}: CreateTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId});
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId});

    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl,
    }));

    const memberOptions = members?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
    }));

    const isLoading = isLoadingProjects || isLoadingMembers;

    if (isLoading) {
        return (
            <Card className="w-full border-slate-200/70 bg-white/80 shadow-sm backdrop-blur">
                <CardContent className="space-y-4 p-6">
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-4 w-80" />
                    <Skeleton className="h-12 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-2/3 rounded-2xl" />
                </CardContent>
            </Card>
        )
    }

    return (
        <CreateTaskForm
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
        />
    );
};