import { PostsTable, UsersTable } from "@/server/db/types";
import { UserAvatar } from "./user-avatar";

interface Props {
  data: PostsTable & { author: UsersTable };
}

export function Post({ data }: Props) {
  return (
    <article className="px-3 py-2">
      <div className="flex items-center gap-2">
        <UserAvatar
          picture={data.author.picture}
          username={data.author.username}
        />

        <div>
          <p className="text-lg font-medium">
            {data.author.firstName} {data.author.lastName}
          </p>
          <p className="text-sm text-zinc-400">@{data.author.username}</p>
        </div>
      </div>

      <p>{data.content}</p>
    </article>
  );
}
