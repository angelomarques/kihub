import { db } from ".";

export type UsersTable = NonNullable<
  Awaited<ReturnType<(typeof db)["query"]["users"]["findFirst"]>>
>;
