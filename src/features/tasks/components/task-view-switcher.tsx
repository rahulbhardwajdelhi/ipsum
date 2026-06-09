"use client";

import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DatKanban } from "./data-kanban";
import { useCallback } from "react";
import { TaskStatus } from "../types";
import { useBulkUpdateTask } from "../api/use-bulk-update-tasks";
import { DataCalendar } from "./data-calendar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { Skeleton } from "@/components/ui/skeleton";
import { startTransition } from "react";

interface TaskViewSwitcherProps {
    hideProjectFilter?: boolean;
};

export const TaskViewSwitcher = ({ hideProjectFilter }: TaskViewSwitcherProps) => {
    const [{
        status,
        assignmeId,
        projectId,
        dueDate,
    }] = useTaskFilters();

    const [ view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    });

    const workspaceId = useWorkspaceId();
    const paramProjectId = useProjectId();
    const { 
        data: tasks, 
        isLoading: isLoadingTasks 
    } = useGetTasks({ 
        workspaceId,
        status,
        assignmeId,
        projectId: paramProjectId || projectId,
        dueDate,
    });

    const { open } = useCreateTaskModal();
    const { mutate: bulkUpdate } = useBulkUpdateTask();


    const onKanbanChange = useCallback((
        tasks: { $id: string; status: TaskStatus; position: number }[]
    ) => {
        bulkUpdate({
            json: { tasks },
        })
    }, [bulkUpdate]);


    return (
        <Tabs
            defaultValue={view}
            onValueChange={(value) => {
                startTransition(() => {
                    setView(value);
                });
            }}
            className="flex-1 w-full rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur"
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full rounded-xl border border-slate-200 bg-white/85 p-1 lg:w-auto">
                        <TabsTrigger
                            className="h-8 w-full rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none lg:w-auto"
                            value="table"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none lg:w-auto"
                            value="calender"
                        >
                            Calender
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="interactive-sheen w-full lg:w-auto"
                    >
                        <PlusIcon className="size-4 mr-2" />
                        New
                    </Button>
                </div>
                <DottedSeperator className="my-4" />
                    <DataFilters hideProjectFilter={hideProjectFilter} />
                <DottedSeperator className="my-4" />
                {isLoadingTasks ? (
                    <div className="grid w-full gap-3 md:grid-cols-2 xl:grid-cols-3">
                        <Skeleton className="ticker-pop h-40 rounded-2xl" />
                        <Skeleton className="ticker-pop h-40 rounded-2xl" />
                        <Skeleton className="ticker-pop h-40 rounded-2xl" />
                    </div>
                ) : (
                <>
                    <TabsContent value="table" className="mt-0">
                        <DataTable columns={columns} data={tasks?.documents ?? []} />
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        <DatKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
                    </TabsContent>
                    <TabsContent value="calender" className="mt-0 h-full pb-4">
                        <DataCalendar data={tasks?.documents ?? []} />
                    </TabsContent>
                </>
                )}
            </div>
        </Tabs>
    );
};