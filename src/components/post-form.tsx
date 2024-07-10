"use client";

import {
  MAX_POST_CONTENT_LENGTH,
  PostFormSchema,
  PostFormSchemaType,
} from "@/lib/schemas/post-form";
import { UsersTable } from "@/server/db/types";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { UserAvatar } from "./user-avatar";
import { useCreatePostMutation } from "@/service/posts";
import { useRouter } from "next/navigation";

interface Props {
  user: UsersTable | null;
  onSuccess?: () => void;
}

export function PostForm({ user, onSuccess }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostFormSchemaType>({
    resolver: zodResolver(PostFormSchema),
  });

  const { mutate: createPost, isPending } = useCreatePostMutation({
    onSuccess: () => {
      reset();

      if (onSuccess) {
        onSuccess();
      }

      router.refresh();
    },
    onError: (error) => {
      const { response } = error;
      toast.error(response?.data ?? "Something went wrong");
    },
  });

  const content = watch("content") ?? "";
  const rawProgress = (content.length / MAX_POST_CONTENT_LENGTH) * 100;
  const progress = rawProgress > 100 ? 100 : rawProgress;

  function onSubmit(data: PostFormSchemaType) {
    createPost(data);
  }

  useEffect(() => {
    if (errors.content?.message) {
      toast.error(errors.content.message);
    }
  }, [errors.content?.message]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4 border-b border-b-zinc-100/20 p-4"
    >
      <div className="flex w-full gap-4">
        <UserAvatar picture={user?.picture} username={user?.username} />
        <div className="w-full flex-1">
          <div className="grow-wrap" data-replicated-value={content}>
            <textarea
              className=""
              placeholder="Tell me something..."
              rows={1}
              {...register("content")}
            ></textarea>
          </div>
          <Progress
            className="mt-2 h-1"
            value={progress}
            indicatorClassName={clsx({ "bg-red-500": rawProgress > 100 })}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          disabled={!!errors.content?.message}
          className="ml-auto"
          type="submit"
          isLoading={isPending}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
