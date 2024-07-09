import { PostsTable, UsersTable } from "@/server/db/types";
import { formatTimeAgoShort } from "@/utils/date";
import { UserAvatar } from "./user-avatar";

interface Props {
  data: PostsTable & { author: UsersTable };
}

export function Post({ data }: Props) {
  return (
    <article className="border-b border-b-zinc-100/20 px-4 py-3">
      <div className="flex gap-2">
        <UserAvatar
          picture={data.author.picture}
          username={data.author.username}
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">
              {data.author.firstName} {data.author.lastName}
            </p>
            <div className="flex gap-1 text-sm text-zinc-400">
              <p>@{data.author.username}</p>
              <p>·</p>
              <p>{formatTimeAgoShort(data.createdAt)}</p>
            </div>
          </div>
          <p className="mt-1 whitespace-pre-line">{data.content}</p>
        </div>
      </div>
    </article>
  );
}
