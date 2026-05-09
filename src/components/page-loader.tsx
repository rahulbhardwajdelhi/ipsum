import { Loader } from "lucide-react"

export const PageLoader = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur">
                <Loader className="size-4 animate-spin text-blue-600" />
                Loading workspace
            </div>
        </div>
    );
};