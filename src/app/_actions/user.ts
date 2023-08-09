import { db } from "@/db";
import { type User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

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
  const result = await db.select().from(users).limit(0).offset(0)

  return result;
}