import { asc, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";

import { advocates } from "./schema";

// ADJUSTMENT: added cursor based pagination to account for "hundreds of thousands of advocates"
export async function getPaginatedAdvocates(
  db: ReturnType<typeof drizzle>,
  pageSize: number,
  cursor?: number
) {
  const data = await db
    .select()
    .from(advocates)
    .where(cursor ? gt(advocates.id, cursor) : undefined)
    .limit(pageSize)
    .orderBy(asc(advocates.id));

  const lastAdvocate = data[data.length - 1];
  const nextCursor = lastAdvocate ? lastAdvocate.id : null;

  return {
    data,
    nextCursor,
  };
}
