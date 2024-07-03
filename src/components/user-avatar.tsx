import Image from "next/image";
import { UserIcon as UserSolidIcon } from "@heroicons/react/20/solid";

interface Props {
  picture?: string | null;
  username?: string;
}

export function UserAvatar({ picture, username = "" }: Props) {
  return (
    <div className="h-10 w-10 overflow-hidden rounded-full">
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
