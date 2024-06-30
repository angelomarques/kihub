import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="h-full w-full overflow-y-scroll border-x border-x-zinc-100/20">
      <Button
        className="absolute bottom-4 right-4 shadow-lg sm:hidden"
        size="icon-lg"
      >
        <PencilSquareIcon className="h-8 w-8" />
      </Button>

      <LogoutLink>logout</LogoutLink>
    </div>
  );
}
