"use client";

import { Button } from "@/components/ui/button";
import { UserIcon } from "@heroicons/react/20/solid";

export function Sidebar() {
  return (
    <>
      <Button
        variant="ghost"
        className="mr-auto rounded-full w-10 h-10 px-1 py-1"
      >
        <UserIcon className="w-8 h-8" />
      </Button>

      <div className="fixed inset-0 bg-zinc-600/30">
        <aside className="bg-zinc-950 h-full w-80 p-3">
          <UserIcon className="w-10 h-10" />
        </aside>
      </div>
    </>
  );
}
