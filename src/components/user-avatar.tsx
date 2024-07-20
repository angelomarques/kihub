import Image from "next/image";
import { UserIcon as UserSolidIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface Props {
  picture?: string | null;
  username?: string;
  className?: string;
}

export function UserAvatar({ picture, username = "", className = "" }: Props) {
  return (
    <div className={clsx("h-10 w-10 overflow-hidden rounded-full", className)}>
      {picture ? (
        <Image
          src={picture}
          alt={username}
          width={40}
          height={40}
          className="object-contain object-center"
        />
      ) : (
        <UserSolidIcon className="h-10 w-10" />
      )}
    </div>
  );
}
