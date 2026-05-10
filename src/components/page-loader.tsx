import { Skeleton } from "@/components/ui/skeleton"

export const PageLoader = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-56" />
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <Skeleton className="h-24 w-full rounded-2xl" />
                    <Skeleton className="h-24 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
};