import { PostForm } from "@/components/post-form";
import { Button } from "@/components/ui/button";
import { getAuthenticatedUser } from "@/server/users/queries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  const user = await getAuthenticatedUser();

  return (
    <div className="h-full w-full overflow-y-scroll border-x border-x-zinc-100/20">
      <Button
        className="absolute bottom-4 right-4 shadow-lg sm:hidden"
        size="icon-lg"
      >
        <PencilSquareIcon className="h-8 w-8" />
      </Button>

      <PostForm user={user} />
    </div>
  );
}
