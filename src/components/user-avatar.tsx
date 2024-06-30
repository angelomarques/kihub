import Image from "next/image";
import { UserIcon as UserSolidIcon } from "@heroicons/react/20/solid";

interface Props {
  picture: string | null;
  username: string;
}

export function UserAvatar({ picture, username }: Props) {
  return picture ? (
    <Image
      src={picture}
      alt={username}
      width={40}
      height={40}
      className="rounded-full object-contain"
    />
  ) : (
    <UserSolidIcon className="h-10 w-10" />
  );
}
