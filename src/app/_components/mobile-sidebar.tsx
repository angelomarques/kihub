"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRightEndOnRectangleIcon as ArrowRightEndOnRectangleSolidIcon,
  HomeIcon as HomeSolidIcon,
  UserIcon as UserSolidIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function toggle() {
    setOpen(!open);
  }

  function isCurrentPath(path: string) {
    return pathname === path;
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
          <aside className="bg-zinc-950 h-full w-80 animate-slide-in border-r border-r-zinc-100/20">
            <div className="py-4 px-3">
              <UserSolidIcon className="w-10 h-10" />

              <Link
                href="/angelomarques"
                className="hover:underline font-medium mt-1.5 block"
              >
                Ângelo Marques
              </Link>
              <p className="text-sm mt-1 text-zinc-400">@angelomarques</p>
            </div>

            <nav className="mt-12">
              <ul>
                <li>
                  <Link
                    href="/"
                    className={clsx(
                      "flex items-center gap-5 text-lg px-3 hover:bg-zinc-600/30 py-3",
                      { "font-bold": isCurrentPath("/") }
                    )}
                  >
                    {isCurrentPath("/") ? (
                      <HomeSolidIcon className="w-6 h-6" />
                    ) : (
                      <HomeIcon className="w-6 h-6" />
                    )}

                    <span>Home</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-5 text-lg px-3 hover:bg-zinc-600/30 py-3"
                  >
                    {isCurrentPath("/profile") ? (
                      <UserSolidIcon className="w-6 h-6" />
                    ) : (
                      <UserIcon className="w-6 h-6" />
                    )}

                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/logout"
                    className="flex items-center gap-5 text-lg px-3 hover:bg-zinc-600/30 py-3"
                  >
                    {isCurrentPath("/logout") ? (
                      <ArrowRightEndOnRectangleSolidIcon className="w-6 h-6" />
                    ) : (
                      <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                    )}

                    <span>Log out</span>
                  </Link>
                </li>
              </ul>
            </nav>
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
