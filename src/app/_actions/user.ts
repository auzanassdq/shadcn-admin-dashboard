import { db } from "@/db";
import { type User, users } from "@/db/schema";
import { count } from "console";
import { eq, sql } from "drizzle-orm";

export async function getUserWithPost(username: string) {
  const result = await db.query.users.findMany({
    where: eq(users.email, username),
    with: {
      posts: true,
    },
  });

  return result;
}

export async function getAllUser() {
  const totalUser = await db.select({count: sql<number>`count(*)`}).from(users)
  const resUsers = await db.select().from(users)
  // .limit(limit).offset(limit*page-limit)

  const result = {
    // page,
    // limit,
    total_user: totalUser,
    data: resUsers,
  }

  return result;
}