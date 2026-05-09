import { AlertTriangle } from "lucide-react";

interface PageErrorProps {
    message: string;
};

export const PageError = ({
    message = "Something went wrong",
}: PageErrorProps) => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 shadow-sm">
                <AlertTriangle className="size-5" />
            </div>
            <p className="mt-4 text-sm font-medium text-slate-600">{message}</p>
        </div>
    );
};