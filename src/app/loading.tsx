"use client";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
                <Skeleton className="h-4 w-32" />
                <div className="mt-4 space-y-3">
                    <Skeleton className="h-12 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-2/3 rounded-2xl" />
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;