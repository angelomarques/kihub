import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { getAuthenticatedUser } from "@/server/users/queries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="h-full w-full overflow-y-scroll border-x border-x-zinc-100/20">
      <Button
        className="absolute bottom-4 right-4 shadow-lg sm:hidden"
        size="icon-lg"
      >
        <PencilSquareIcon className="h-8 w-8" />
      </Button>

      <PostForm />
    </div>
  );
}

async function PostForm() {
  const user = await getAuthenticatedUser();

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-b border-b-zinc-100/20 p-4">
      <div className="flex w-full gap-4">
        <UserAvatar picture={user?.picture} username={user?.username} />
        <textarea
          className="w-full flex-1 resize-none border-x-0 border-b border-t-0 border-zinc-100/20 bg-transparent pb-3 outline-none"
          placeholder="Tell me something..."
        ></textarea>
      </div>
      <Button className="ml-auto">Submit</Button>
    </div>
  );
}
