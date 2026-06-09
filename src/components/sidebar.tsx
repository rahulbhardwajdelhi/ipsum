"use client";

import Image from "next/image";
import Link from "next/link";
import { DottedSeperator } from "./dotted-seperator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [showWorkspaces, setShowWorkspaces] = useState(true);
    const [showNavigation, setShowNavigation] = useState(true);
    const [showProjects, setShowProjects] = useState(true);

    useEffect(() => {
        router.prefetch(`/workspaces/${workspaceId}/tasks`);
        router.prefetch(`/workspaces/${workspaceId}/members`);
        router.prefetch(`/workspaces/${workspaceId}/settings`);
    }, [router, workspaceId]);

    return (
        <aside className="flex h-full w-full flex-col rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_24px_90px_-30px_rgba(15,23,42,0.28)] backdrop-blur-xl">
            <Link href="/" className="inline-flex w-fit items-center">
                <Image src="/logo.svg" alt="Ipsum" width={164} height={48}/>
            </Link>
            <DottedSeperator className="my-5" />

            <SectionHeader
                title="Workspaces"
                isOpen={showWorkspaces}
                onToggle={() => setShowWorkspaces((prev) => !prev)}
            />
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300",
                    showWorkspaces ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="pt-2">
                    <WorkspaceSwitcher />
                </div>
            </div>

            <DottedSeperator className="my-5" />

            <SectionHeader
                title="Navigation"
                isOpen={showNavigation}
                onToggle={() => setShowNavigation((prev) => !prev)}
            />
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300",
                    showNavigation ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="pt-2">
                    <Navigation />
                </div>
            </div>

            <DottedSeperator className="my-5" />

            <SectionHeader
                title="Projects"
                isOpen={showProjects}
                onToggle={() => setShowProjects((prev) => !prev)}
            />
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300",
                    showProjects ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="pt-2">
                    <Projects />
                </div>
            </div>
        </aside>
    );
};

interface SectionHeaderProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
}

const SectionHeader = ({ title, isOpen, onToggle }: SectionHeaderProps) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="group flex w-full items-center justify-between rounded-lg px-1 py-1.5 text-left"
        >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {title}
            </span>
            <ChevronDown
                className={cn(
                    "size-4 text-slate-400 transition-transform duration-200 group-hover:text-slate-600",
                    isOpen && "rotate-180"
                )}
            />
        </button>
    );
};