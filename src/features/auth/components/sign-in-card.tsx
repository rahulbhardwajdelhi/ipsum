"use client";

import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";

export const SignInCard = () => {
    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({ json: values });
    }

    return (
        <Card className="w-full max-w-[487px] border-slate-200/70 bg-white/85 shadow-[0_30px_90px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
            <CardHeader className="px-8 pt-8 text-center">
                <CardTitle className="font-[family-name:var(--font-heading)] text-3xl tracking-tight text-slate-950">
                    Welcome back
                </CardTitle>
                <p className="text-sm text-slate-600">
                    Sign in to keep your workspaces, tasks, and teammates in sync.
                </p>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-0">
                <DottedSeperator className="mb-6" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />    
                        <Button disabled={isPending} size="lg" className="w-full shadow-lg shadow-blue-500/20">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardContent className="px-8 pb-8 pt-0">
                <DottedSeperator className="mb-6" />
                <div className="flex flex-col gap-3">
                <Button
                    onClick={() => signUpWithGoogle()}
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full justify-center"
                >
                    <FcGoogle className="mr-2 size-5" />
                    Login with Google
                </Button>
                <Button
                    onClick={() => signUpWithGithub()}
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full justify-center"
                >
                    <FaGithub className="mr-2 size-5" />
                    Login with Github
                </Button>
                </div>
                <p className="mt-6 text-center text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="font-semibold text-blue-700 hover:text-blue-800">
                        Sign up
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};
