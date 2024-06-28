"use client";

import { Logo } from "@/assets/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowRightEndOnRectangleIcon as ArrowRightEndOnRectangleSolidIcon,
  HomeIcon as HomeSolidIcon,
  UserIcon as UserSolidIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserIcon,
  PencilSquareIcon,
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
    <aside className="bg-zinc-950 h-full hidden sm:flex pl-6 py-8 flex-col">
      <Button variant="ghost" size="icon-lg" className="ml-4">
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
                <HomeSolidIcon className="w-10 h-10" />
              ) : (
                <HomeIcon className="w-10 h-10" />
              )}

              <span className="hidden lg:inline">Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/profile"
              className="flex items-center gap-5 text-lg px-5 hover:bg-zinc-600/20 py-3 w-fit rounded-3xl"
            >
              {isCurrentPath("/profile") ? (
                <UserSolidIcon className="w-10 h-10" />
              ) : (
                <UserIcon className="w-10 h-10" />
              )}

              <span className="hidden lg:inline">Profile</span>
            </Link>
          </li>

          <li>
            <Link
              href="/logout"
              className="flex items-center gap-5 text-lg px-5 hover:bg-zinc-600/20 py-3 w-fit rounded-3xl"
            >
              {isCurrentPath("/logout") ? (
                <ArrowRightEndOnRectangleSolidIcon className="w-10 h-10" />
              ) : (
                <ArrowRightEndOnRectangleIcon className="w-10 h-10" />
              )}

              <span className="hidden lg:inline">Log out</span>
            </Link>
          </li>

          <li>
            <Link
              href="compose/post"
              className={buttonVariants({
                className: "w-5/6 mt-3 py-3",
              })}
            >
              <PencilSquareIcon className="w-8 h-8 lg:hidden" />
              <span className="hidden lg:inline">Post</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex gap-2 items-center mt-auto">
        <UserSolidIcon className="w-10 h-10" />
        <div className="hidden lg:block">
          <Link
            href="/angelomarques"
            className="hover:underline font-medium mt-1.5 block"
          >
            Ângelo Marques
          </Link>
          <p className="text-sm mt-1 text-zinc-400">@angelomarques</p>
        </div>
      </div>
    </aside>
  );
}
