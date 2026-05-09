"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

const pathnameMap = {
    "tasks": {
        title: "My Tasks",
        description: "View all of your tasks here",
    },
    "projects": {
        title: "My Projects",
        description: "View the projects inside this workspace",
    },
};

const defaultMap = {
    title: "Home",
    description: "Monitor all of your projects and tasks here",
};

export const Navbar = () => {
    const pathname = usePathname();
    const pathnameParts = pathname.split("/");
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

    const { title, description } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="hidden flex-col rounded-2xl border border-white/70 bg-white/70 px-5 py-4 shadow-sm backdrop-blur lg:flex">
                <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight text-slate-950">
                    {title}
                </h1>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <MobileSidebar />
            <UserButton />
        </nav>
    );
};