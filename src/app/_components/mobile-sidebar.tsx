"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { UsersTable } from "@/server/db/types";
import {
  ArrowRightEndOnRectangleIcon as ArrowRightEndOnRectangleSolidIcon,
  HomeIcon as HomeSolidIcon,
  UserIcon as UserSolidIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  user: UsersTable | null;
}

export function MobileSidebar({ user }: Props) {
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
        className="mr-auto h-10 w-10 rounded-full px-1 py-1"
        onClick={toggle}
      >
        <Bars3Icon className="h-8 w-8" />
      </Button>

      {open && (
        <div className="fixed inset-0 flex">
          <aside className="h-full w-80 animate-slide-in border-r border-r-zinc-100/20 bg-zinc-950">
            {user ? (
              <div className="px-3 py-4">
                <UserAvatar picture={user.picture} username={user.username} />

                <Link
                  href={`/${user.username}`}
                  className="mt-1.5 block font-medium hover:underline"
                >
                  {`${user.firstName} ${user.lastName}`}
                </Link>
                <p className="mt-1 text-sm text-zinc-400">@{user.username}</p>
              </div>
            ) : (
              <LoginLink
                className={buttonVariants({ className: "mx-3 my-4 w-5/6" })}
              >
                Log in
              </LoginLink>
            )}

            <nav className="mt-12">
              <ul>
                <li>
                  <Link
                    href="/"
                    className={clsx(
                      "flex items-center gap-5 px-3 py-3 text-lg hover:bg-zinc-600/20",
                      { "font-bold": isCurrentPath("/") },
                    )}
                  >
                    {isCurrentPath("/") ? (
                      <HomeSolidIcon className="h-6 w-6" />
                    ) : (
                      <HomeIcon className="h-6 w-6" />
                    )}

                    <span>Home</span>
                  </Link>
                </li>

                {user && (
                  <li>
                    <Link
                      href={`/users/${user.username}`}
                      className="flex items-center gap-5 px-3 py-3 text-lg hover:bg-zinc-600/20"
                    >
                      {isCurrentPath(`/users/${user.username}`) ? (
                        <UserSolidIcon className="h-6 w-6" />
                      ) : (
                        <UserIcon className="h-6 w-6" />
                      )}

                      <span>Profile</span>
                    </Link>
                  </li>
                )}
                <li>
                  <LogoutLink className="flex items-center gap-5 px-3 py-3 text-lg hover:bg-zinc-600/20">
                    {isCurrentPath("/logout") ? (
                      <ArrowRightEndOnRectangleSolidIcon className="h-6 w-6" />
                    ) : (
                      <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                    )}

                    <span>Log out</span>
                  </LogoutLink>
                </li>
              </ul>
            </nav>
          </aside>

          <div
            className="h-full flex-1 animate-fade-in bg-zinc-600/30"
            onClick={toggle}
          />
        </div>
      )}
    </>
  );
}
