"use client";

import { Button } from "@/components/ui/button";
import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen(!open);
  }

  return (
    <>
      <Button
        variant="ghost"
        className="mr-auto rounded-full w-10 h-10 px-1 py-1"
        onClick={toggle}
      >
        <UserIcon className="w-8 h-8" />
      </Button>

      {open && (
        <div className="fixed inset-0 flex">
          <aside className="bg-zinc-950 h-full w-80 py-4 px-3 animate-slide-in border-r border-r-zinc-100/20">
            <UserIcon className="w-10 h-10" />

            <Link
              href="/angelomarques"
              className="hover:underline font-medium mt-1.5 block"
            >
              Ângelo Marques
            </Link>
            <p className="text-sm mt-1 text-zinc-400">@angelomarques</p>
          </aside>

          <div
            className="bg-zinc-600/30 h-full flex-1 animate-fade-in"
            onClick={toggle}
          />
        </div>
      )}
    </>
  );
}
