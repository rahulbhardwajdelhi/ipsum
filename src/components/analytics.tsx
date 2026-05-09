import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";
import { DottedSeperator } from "./dotted-seperator";

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
    return (
        <ScrollArea className="w-full rounded-2xl border border-slate-200/70 bg-white/70 whitespace-nowrap shrink-0 shadow-sm backdrop-blur">
            <div className="flex w-full flex-row">
                <div className="flex flex-1 items-center">
                    <AnalyticsCard
                        title="Total Tasks"
                        value={data.taskCount}
                        variant={data.taskDifference > 0 ? "up" : "down" }
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeperator direction="vertical" />
                </div>
                <div className="flex flex-1 items-center">
                    <AnalyticsCard
                        title="Assigned Task"
                        value={data.assignedTaskCount}
                        variant={data.assignedTaskDifference > 0 ? "up" : "down" }
                        increaseValue={data.assignedTaskDifference}
                    />
                    <DottedSeperator direction="vertical" />
                </div>
                <div className="flex flex-1 items-center">
                    <AnalyticsCard
                        title="Completed Task"
                        value={data.completedTaskCount}
                        variant={data.completedTaskDifference > 0 ? "up" : "down" }
                        increaseValue={data.completedTaskDifference}
                    />
                    <DottedSeperator direction="vertical" />
                </div>
                <div className="flex flex-1 items-center">
                    <AnalyticsCard
                        title="Overdue Task"
                        value={data.overdueTaskCount}
                        variant={data.overdueTaskDifference > 0 ? "up" : "down" }
                        increaseValue={data.overdueTaskDifference}
                    />
                    <DottedSeperator direction="vertical" />
                </div>
                <div className="flex flex-1 items-center">
                    <AnalyticsCard
                        title="Incomplete Task"
                        value={data.incompleteTaskCount}
                        variant={data.incompleteTaskDifference > 0 ? "up" : "down" }
                        increaseValue={data.incompleteTaskDifference}
                    />
                    <DottedSeperator direction="vertical" />
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}