"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AuthLayoutProps{
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps ) => {
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in";

    return(
        <main className="relative min-h-screen overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_32%)]" />
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl" />
            <div className="relative mx-auto max-w-screen-2xl p-4">
                <nav className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
                    <Image src="/logo.svg" alt="Ipsum" width={152} height={56} />
                    <div className="flex items-center gap-2">
                        <Button asChild variant="secondary" className="bg-white/90">
                            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                                {isSignIn ? "Sign Up" : "Login"}
                            </Link>
                        </Button>
                    </div>
                </nav>
                <div className="flex flex-col items-center justify-center px-4 py-10 md:py-16">
                    <div className="mb-8 max-w-xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                            Team workspace
                        </p>
                        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                            Clean workspaces make the rest of the day feel lighter.
                        </h1>
                        <p className="mt-4 text-sm leading-6 text-slate-600 md:text-base">
                            Sign in or create an account to keep projects, tasks, and members in one calm place.
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </main>
    )
};

export default AuthLayout;