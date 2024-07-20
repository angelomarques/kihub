import Image from "next/image";
import { UserIcon as UserSolidIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface Props {
  picture?: string | null;
  username?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function UserAvatar({
  picture,
  username = "",
  className = "",
  width = 40,
  height = 40,
}: Props) {
  return (
    <div
      className={clsx("overflow-hidden rounded-full", className)}
      style={{ width, height }}
    >
      {picture ? (
        <Image
          src={picture}
          alt={username}
          width={width}
          height={height}
          className="object-contain object-center"
        />
      ) : (
        <UserSolidIcon className="h-10 w-10" />
      )}
    </div>
  );
}
