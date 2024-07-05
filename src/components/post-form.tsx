"use client";

import { UsersTable } from "@/server/db/types";
import { ChangeEventHandler, useState } from "react";
import { UserAvatar } from "./user-avatar";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import clsx from "clsx";

interface Props {
  user: UsersTable | null;
}

export function PostForm({ user }: Props) {
  const maxPostLength = 280;
  const [content, setContent] = useState("");
  const rawProgress = (content.length / maxPostLength) * 100;
  const progress = rawProgress > 100 ? 100 : rawProgress;

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-b border-b-zinc-100/20 p-4">
      <div className="flex w-full gap-4">
        <UserAvatar picture={user?.picture} username={user?.username} />
        <div className="w-full flex-1">
          <div className="grow-wrap" data-replicated-value={content}>
            <textarea
              className=""
              placeholder="Tell me something..."
              onChange={handleChange}
              value={content}
              rows={1}
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
        <Button className="ml-auto">Submit</Button>
      </div>
    </div>
  );
}
