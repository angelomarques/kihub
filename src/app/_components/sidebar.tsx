"use client";

import { Logo } from "@/assets/logo";
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

export function Sidebar() {
  const pathname = usePathname();

  function isCurrentPath(path: string) {
    return pathname === path;
  }

  return (
    <aside className="bg-zinc-950 h-full w-80 border-r border-r-zinc-100/20">
      <Button variant="ghost" size="icon-lg">
        <Logo className="w-10 h-10" />
      </Button>

      <nav className="mt-12">
        <ul>
          <li>
            <Link
              href="/"
              className={clsx(
                "flex items-center gap-5 text-lg px-5 hover:bg-zinc-600/20 py-3 w-fit rounded-3xl",
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
              className="flex items-center gap-5 text-lg px-5 hover:bg-zinc-600/20 py-3 w-fit rounded-3xl"
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
              className="flex items-center gap-5 text-lg px-5 hover:bg-zinc-600/20 py-3 w-fit rounded-3xl"
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
  );
}
