import { PostForm } from "@/components/post-form";
import { Posts } from "@/components/posts";
import { buttonVariants } from "@/components/ui/button";
import { getAuthenticatedUser } from "@/server/users/queries";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kihub | Home",
};

export default async function Home() {
  const user = await getAuthenticatedUser();

  return (
    <div className="h-full w-full overflow-y-scroll">
      <Link
        className={buttonVariants({
          className: "absolute bottom-4 right-4 shadow-lg sm:hidden",
          size: "icon-lg",
        })}
        href="/compose/post"
      >
        <PencilSquareIcon className="h-8 w-8" />
      </Link>

      <PostForm className="hidden md:flex" user={user} />

      <Posts />
    </div>
  );
}
