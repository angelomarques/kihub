"use client";

import { PostForm } from "@/components/post-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
        <Button
          className="ml-auto flex"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <XMarkIcon className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        <PostForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
