"use client";

import Image from "next/image";
import Link from "next/link";
import { DottedSeperator } from "./dotted-seperator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const Sidebar = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

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
            <WorkspaceSwitcher />
            <DottedSeperator className="my-5" />
            <Navigation />
            <DottedSeperator className="my-5" />
            <Projects />
        </aside>
    );
};