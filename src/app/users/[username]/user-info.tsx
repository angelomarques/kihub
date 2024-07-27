"use client";

import { UserAvatar } from "@/components/user-avatar";
import { useUserByUsernameQuery } from "@/service/users";
import { buttonVariants } from "@/components/ui/button";
import { CakeIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { formatDate } from "date-fns";
import Link from "next/link";

interface Props {
  username: string;
  isOwner: boolean;
}

export function UserInfo({ username, isOwner }: Props) {
  const { data: user } = useUserByUsernameQuery(username);

  if (!user) {
    return null;
  }

  return (
    <div className="border-b border-b-zinc-100/20 p-4">
      <div className="flex gap-5">
        <UserAvatar
          width={96}
          height={96}
          picture={user?.picture}
          username={user?.username}
        />
        <div className="flex-1">
          <div className="flex flex-1 justify-between">
            <div>
              <h1 className="text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
              <p className="mt-2 text-sm text-gray-500">@{user?.username}</p>
            </div>

            {isOwner && (
              <Link
                href={`/users/${user.username}/edit`}
                className={buttonVariants({ variant: "outline" })}
              >
                Edit profile
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user.dateOfBirth && (
              <p className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                <CakeIcon className="h-4 w-4" />
                <span>
                  Born {formatDate(user.dateOfBirth, "MMMM dd, yyyy")}
                </span>
              </p>
            )}

            <p className="mt-3 flex items-center gap-1 text-sm text-gray-500">
              <CalendarDaysIcon className="h-4 w-4" />
              <span>Joined {formatDate(user.createdAt, "MMMM dd, yyyy")}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex-1">
        <p className="truncate-clamp-3 mt-2 text-sm">{user?.biography}</p>
      </div>
    </div>
  );
}
