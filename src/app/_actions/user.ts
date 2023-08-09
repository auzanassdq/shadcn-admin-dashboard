import { db } from "@/db";
import { type User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserWithPost(username: string) {
  const result = await db.query.users.findMany({
    // name: users.name,
    where: eq(users.email, username),
    with: {
      posts: true,
    },
  });
  // .from(users)

  return result;
}

export async function getAllUser() {
  const result = await db
    .select(
      // { 
      // id: users.id, 
      // name: users.name, 
      // email: users.email, 
      // username: users.username, 
      // city: users.city, 
      // birth: users.birth 
      // }
    )
    .from(users);
  // .from(users)

  return result;
}
