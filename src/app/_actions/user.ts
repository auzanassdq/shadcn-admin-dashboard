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

const queryParamsSchema = z.object({
  column: z.string().default(""),
  order: z.string().default(""),
  limit: z.number().default(0),
});

export type QuaryParams = z.infer<typeof queryParamsSchema>;

export async function getAllUser(query: QuaryParams) {
  const { column, order, limit } = queryParamsSchema.parse(query);
  console.log("DBBBBBBBB", column, order, limit);

  const orderByQuery = column ? `${column} ${order}` : "id asc";
  const limitQuery = limit ? limit : 10

  const totalUser = await db
    .select({ count: sql<number>`count(id)` })
    .from(users);

  const resUsers = await db
    .select()
    .from(users)
    .orderBy(sql.raw(orderByQuery))
    .limit(limitQuery);

  const result = {
    total_user: totalUser,
    data: resUsers,
  };

  return result;
}
