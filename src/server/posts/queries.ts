import { db } from "../db";

export function getPosts(page = 1) {
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

export function getSinglePost(id: number) {
  return db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
    with: {
      author: true,
    },
  });
}
