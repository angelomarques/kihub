import { db } from "../db";

export async function getPosts(page = 1) {
  const pageSize = 10;

  return db.query.posts.findMany({
    with: {
      author: true,
    },
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}
