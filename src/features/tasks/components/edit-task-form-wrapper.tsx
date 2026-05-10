import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./edit-task-form";

interface EditTaskFormWrapperProps {
    onCancel: () => void;
    id: string;
};

export const EditTaskFormWrapper = ({
    onCancel,
    id,
}: EditTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();

    const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
        taskId: id,
    });

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

    const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

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

    if(!initialValues) {
        return null;
    }

    return (
        <EditTaskForm
            onCancel={onCancel}
            initialValues={initialValues}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
        />
    );
};