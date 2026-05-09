"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CreateWorkspaceFormProps {
    onCancel?: () => void;
};

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
    const router = useRouter();
    const { mutate, isPending } = useCreateWorkspace();

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        mutate({ form: finalValues }, {
            onSuccess: ({ data }) => {
                form.reset();
                router.push(`/workspaces/${data.$id}`);
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            form.setValue("image", file);
        }
    }

    return (
        <Card className="w-full border-slate-200/70 bg-white/85 shadow-[0_30px_90px_-28px_rgba(15,23,42,0.25)] backdrop-blur">
            <CardHeader className="px-8 pt-8">
                <CardTitle className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-950">
                    Create a new workspace
                </CardTitle>
                <p className="text-sm text-slate-600">
                    Give your team a place to organize projects, tasks, and members.
                </p>
            </CardHeader>
            <div className="px-8">
                <DottedSeperator />
            </div>
            <CardContent className="px-8 pb-8 pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-700">
                                            Workspace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter workspace name"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <div className="space-y-3">
                                        <FormLabel className="text-sm font-medium text-slate-700">
                                            Workspace Icon
                                        </FormLabel>
                                        <div className="flex items-center gap-x-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                                            {field.value ? (
                                                <div className="relative size-[72px] overflow-hidden rounded-2xl ring-1 ring-slate-200">
                                                    <Image
                                                        alt="Logo"
                                                        fill
                                                        className="object-cover"
                                                        src={
                                                            field.value instanceof File
                                                                ? URL.createObjectURL(field.value)
                                                                : field.value
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className="size-[72px] border border-slate-200 bg-white">
                                                    <AvatarFallback>
                                                        <ImageIcon className="size-[36px] text-slate-400" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium text-slate-700">Choose a brand mark</p>
                                                <p className="text-sm text-slate-500">
                                                    JPG, PNG, SVG or JPEG, max 1MB
                                                </p>
                                                <input
                                                    className="hidden"
                                                    type="file"
                                                    accept=".jpg, .png, .jpeg, .svg"
                                                    ref={inputRef}
                                                    onChange={handleImageChange}
                                                    disabled={isPending}
                                                />
                                                {field.value ? (
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant="destructive"
                                                        size="xs"
                                                        className="mt-2 w-fit"
                                                        onClick={() => {
                                                            field.onChange(null);
                                                            if(inputRef.current) {
                                                                inputRef.current.value = "";
                                                            }
                                                        }}
                                                    >
                                                        Remove Image
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        disabled={isPending}
                                                        variant="teritary"
                                                        size="xs"
                                                        className="mt-2 w-fit"
                                                        onClick={() => inputRef.current?.click()}
                                                    >
                                                        Upload Image
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <DottedSeperator className="py-5" />
                        <div className="flex items-center justify-between gap-4">
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="secondary"
                                    onClick={onCancel}
                                    disabled={isPending}
                                    className={cn(!onCancel && "invisible")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isPending}
                                    className="shadow-lg shadow-blue-500/20"
                                >
                                    Create Workspace
                                </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};