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
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  function isCurrentPath(path: string) {
    return pathname === path;
  }

  return (
    <aside className="hidden h-full flex-col bg-zinc-950 py-8 pl-6 sm:flex">
      <Button variant="ghost" size="icon-lg" className="ml-4">
        <Logo className="h-10 w-10" />
      </Button>

      <nav className="mt-12">
        <ul>
          <li>
            <Link
              href="/"
              className={clsx(
                "flex w-fit items-center gap-5 rounded-xl px-5 py-3 text-lg hover:bg-zinc-600/20",
                { "font-bold": isCurrentPath("/") },
              )}
            >
              {isCurrentPath("/") ? (
                <HomeSolidIcon className="h-10 w-10" />
              ) : (
                <HomeIcon className="h-10 w-10" />
              )}

              <span className="hidden lg:inline">Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/profile"
              className="flex w-fit items-center gap-5 rounded-xl px-5 py-3 text-lg hover:bg-zinc-600/20"
            >
              {isCurrentPath("/profile") ? (
                <UserSolidIcon className="h-10 w-10" />
              ) : (
                <UserIcon className="h-10 w-10" />
              )}

              <span className="hidden lg:inline">Profile</span>
            </Link>
          </li>

          <li>
            <LogoutLink className="flex w-fit items-center gap-5 rounded-xl px-5 py-3 text-lg hover:bg-zinc-600/20">
              {isCurrentPath("/logout") ? (
                <ArrowRightEndOnRectangleSolidIcon className="h-10 w-10" />
              ) : (
                <ArrowRightEndOnRectangleIcon className="h-10 w-10" />
              )}

              <span className="hidden lg:inline">Log out</span>
            </LogoutLink>
          </li>

          <li>
            <Link
              href="compose/post"
              className={buttonVariants({
                className: "mt-3 w-5/6 py-3",
              })}
            >
              <PencilSquareIcon className="h-8 w-8 lg:hidden" />
              <span className="hidden lg:inline">Post</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto flex items-center gap-2">
        <UserSolidIcon className="h-10 w-10" />
        <div className="hidden lg:block">
          <Link
            href="/angelomarques"
            className="mt-1.5 block font-medium hover:underline"
          >
            Ângelo Marques
          </Link>
          <p className="mt-1 text-sm text-zinc-400">@angelomarques</p>
        </div>
      </div>
    </aside>
  );
}
