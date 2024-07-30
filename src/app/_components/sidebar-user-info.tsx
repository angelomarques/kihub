"use client";

import { UserAvatar } from "@/components/user-avatar";
import { useUserByUsernameQuery } from "@/service/users";
import Link from "next/link";

export function SidebarUserInfo() {
  const { data: user } = useUserByUsernameQuery("me");

  if (!user) {
    return null;
  }

  return (
    <div className="mt-auto flex items-center gap-2">
      <UserAvatar picture={user.picture} username={user.username} />
      <div className="hidden flex-1 lg:block">
        <Link
          href={`/users/${user.username}`}
          className="mt-1.5 block font-medium hover:underline"
        >
          {`${user.firstName} ${user.lastName}`}
        </Link>
        <p className="mt-1 text-sm text-zinc-400">@{user.username}</p>
      </div>
    </div>
  );
}
