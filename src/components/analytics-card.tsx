import { cn } from "@/lib/utils";
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";


interface AnalyticsCardProps {
    title: string;
    value: number;
    variant: "up" | "down";
    increaseValue: number;
}

export const AnalyticsCard = ({
    title,
    value,
    variant,
    increaseValue,
}: AnalyticsCardProps) => {
    const iconColor = variant === "up" ? "text-emerald-500" : "text-rose-500";
    const increaseValueColor = variant === "up" ? "text-emerald-500" : "text-rose-500";
    const Icon = variant === "up" ? ArrowUpRight : ArrowDownRight;

    return (
        <Card className="w-full border-slate-200/70 bg-white/70 shadow-none">
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <CardDescription className="truncate text-sm font-medium text-slate-500">
                        {title}
                    </CardDescription>
                    <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">
                        <Icon className={cn(iconColor, "size-4")} />
                        <span className={cn(increaseValueColor, "tabular-nums")}>
                            {increaseValue}
                        </span>
                    </div>
                </div>
                <CardTitle className="text-3xl font-semibold tracking-tight text-slate-950">
                    {value}
                </CardTitle>
            </CardHeader>
        </Card>
    )
}