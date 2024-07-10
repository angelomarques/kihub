"use client";

import { PostForm } from "@/components/post-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UsersTable } from "@/server/db/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  user: UsersTable | null;
}

export function PostFormDialog({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (pathname !== "/compose/post") {
      router.refresh();
      setOpen(false);
    }
  }, [pathname, router]);

  function handleSuccess() {
    router.push("/");
    router.refresh();
  }

  return (
    <Dialog open={open}>
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

        <PostForm user={user} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
