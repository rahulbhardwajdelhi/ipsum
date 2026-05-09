import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";

interface StandaloneLayoutProps {
    children: React.ReactNode;
};

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_34%)]" />
            <div className="relative mx-auto max-w-screen-2xl p-4">
                <nav className="flex h-[73px] items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 shadow-sm backdrop-blur">
                    <Link href="/">
                        <Image src="/logo.svg" alt="Ipsum" height={56} width={152} />
                    </Link>
                    <UserButton />
                </nav>
                <div className="flex flex-col items-center justify-center px-4 py-8 md:py-12">
                    {children}
                </div>
            </div>
        </main>
    );
}

export default StandaloneLayout;