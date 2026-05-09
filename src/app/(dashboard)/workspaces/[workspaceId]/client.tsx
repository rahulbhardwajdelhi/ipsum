"use client";

import { Analytics } from "@/components/analytics";
import { DottedSeperator } from "@/components/dotted-seperator";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { PlusIcon, CalendarIcon, SettingsIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/features/projects/types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Member } from "@/features/members/types";
import { MemberAvatar } from "@/features/members/components/member-avatar";

export const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId();

    const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId });
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId });
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = 
        isLoadingAnalytics ||
        isLoadingTasks ||
        isLoadingProjects ||
        isLoadingMembers;    

    if (isLoading) {
        return <PageLoader />
    }

    if (!analytics || !tasks || !projects || !members) {
        return <PageError message="Failed to load workspace data" />
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <TaskList data={tasks.documents} total={tasks.total} />
                <ProjectList data={projects.documents} total={projects.total} />
                <MembersList data={members.documents} total={members.total} />
            </div>
            <Analytics data={analytics} />
        </div>
    );
};

interface TaskListProps {
    data: Task[];
    total: number;
};

export const TaskList = ({ data, total }: TaskListProps) => {
    const workspaceId = useWorkspaceId();
    const { open: createTask } = useCreateTaskModal();

    return (
        <div className="col-span-1 flex flex-col gap-y-4">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold tracking-tight text-slate-950">
                        Tasks ({total})
                    </p>
                    <Button variant="muted" size="icon" onClick={createTask}>
                        <PlusIcon className="size-4 text-slate-500" />
                    </Button>
                </div>
                <DottedSeperator className="my-4" />
                <ul className="flex flex-col gap-y-4">
                    {data.map((task) => (
                        <li key={task.$id}>
                            <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                                <Card className="rounded-xl border-slate-200/70 bg-white/90 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
                                    <CardContent className="p-4">
                                        <p className="truncate text-lg font-medium text-slate-950">{task.name}</p>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <p className="truncate">{task.project?.name}</p>
                                            <div className="flex items-center">
                                                <CalendarIcon className="size-3 mr-1" />
                                                <span className="truncate">
                                                    {formatDistanceToNow(new Date(task.dueDate))}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No tasks found
                    </li>
                </ul>
                <Button variant="muted" className="mt-4 w-full" asChild>
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                        Show All
                    </Link>
                </Button>
            </div>
        </div>
    );
};

interface ProjectListProps {
    data: Project[];
    total: number;
};

export const ProjectList = ({ data, total }: ProjectListProps) => {
    const { open: createProject } = useCreateProjectModal();
    const workspaceId = useWorkspaceId();

    return (
        <div className="col-span-1 flex flex-col gap-y-4">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold tracking-tight text-slate-950">
                        Projects ({total})
                    </p>
                    <Button variant="secondary" size="icon" onClick={createProject}>
                        <PlusIcon className="size-4 text-slate-500" />
                    </Button>
                </div>
                <DottedSeperator className="my-4" />
                <ul className="grid grid-cols-1 gap-4">
                    {data.map((project) => (
                        <li key={project.$id}>
                            <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                                <Card className="rounded-xl border-slate-200/70 bg-white/90 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
                                    <CardContent className="flex items-center gap-x-3 p-4">
                                        <ProjectAvatar
                                            className="size-12"
                                            fallbackClassName="text-lg"
                                            name={project.name}
                                            image={project.imageUrl}
                                        />
                                        <p className="truncate text-lg font-medium text-slate-950">
                                            {project.name} 
                                        </p>
                                    </CardContent> 
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No projects found
                    </li>
                </ul>
            </div>
        </div>
    );
};

interface MembersListProps {
    data: Member[];
    total: number;
};

export const MembersList = ({ data, total }: MembersListProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="col-span-1 flex flex-col gap-y-4">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold tracking-tight text-slate-950">
                        Members ({total})
                    </p>
                    <Button variant="secondary" size="icon" asChild>
                        <Link href={`/workspaces/${workspaceId}/members`}> 
                            <SettingsIcon className="size-4 text-slate-500" />
                        </Link>
                    </Button>
                </div>
                <DottedSeperator className="my-4" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((member) => (
                        <li key={member.$id}>
                            <Card className="overflow-hidden rounded-xl border-slate-200/70 bg-white/90 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
                                <CardContent className="flex flex-col items-center gap-x-2 p-4">
                                    <MemberAvatar
                                        className="size-12"
                                        name={member.name}
                                    />
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="line-clamp-1 text-lg font-medium text-slate-950">
                                            {member.name} 
                                        </p>
                                        <p className="line-clamp-1 text-sm text-slate-500">
                                            {member.email}
                                        </p>
                                    </div>
                                </CardContent> 
                            </Card>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No members found
                    </li>
                </ul>
            </div>
        </div>
    );
};