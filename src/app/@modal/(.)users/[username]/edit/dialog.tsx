"use client";

import { EditUserForm } from "@/components/edit-user-form";
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
  user: UsersTable;
}

export function EditUserFormDialog({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname.includes("/edit");

  return (
    <Dialog open={isOpen} onOpenChange={() => router.back()}>
      <DialogContent>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-medium">
            Edit Profile
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <DialogDescription className="sr-only">
          Update your profile
        </DialogDescription>

        <EditUserForm user={user} />
      </DialogContent>
    </Dialog>
  );
}
