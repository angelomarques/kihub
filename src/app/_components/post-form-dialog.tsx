"use client";

import { PostForm } from "@/components/post-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { UsersTable } from "@/server/db/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: UsersTable | null;
}

export function PostFormDialog({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname === "/compose/post";

  return (
    <Dialog open={isOpen} onOpenChange={() => router.back()}>
      <DialogContent>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-medium">New Post</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <DialogDescription className="sr-only">
          Write a new post
        </DialogDescription>

        <PostForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
