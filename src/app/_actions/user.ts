import { db } from "@/db";
import { type User, users } from "@/db/schema";
import { count } from "console";
import { asc, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

export async function getUserWithPost(username: string) {
  const result = await db.query.users.findMany({
    where: eq(users.email, username),
    with: {
      posts: true,
    },
  });

  return result;
}

export const queryParamsSchema = z.object({
  column: z.string().default(""),
  order: z.string().default(""),
  limit: z.number().default(0),
  search: z.string().default(""),
  searchColumn: z.string().default(""),
});

export type QuaryParams = z.infer<typeof queryParamsSchema>;

export async function getAllUser({
  column,
  order,
  limit,
  search,
  searchColumn,
}: QuaryParams) {
  // const { column, order, limit, search, searchColumn = "email" } = query;

  const orderByQuery = column ? `${column} ${order}` : "id asc";
  const limitQuery = limit ? limit : 10;
  const searchQuery =
    !search && !searchColumn
      ? `email like '%%'`
      : search && searchColumn
      ? `${searchColumn} like '%${search}%'`
      : `email like '%${search}%'`;

  console.log(searchQuery);

  const [totalUser, resUsers] = await Promise.all([
    db.select({ count: sql<number>`count(id)` }).from(users),
    db
      .select()
      .from(users)
      .where(sql.raw(searchQuery))
      .orderBy(sql.raw(orderByQuery))
      .limit(limitQuery),
  ]);

  const result = {
    totalData: totalUser[0].count,
    data: resUsers,
  };

  return result;
}
