import { connect } from "@planetscale/database";
import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getAllPosts(): Promise<Post[]> {
  const conn = connect(config);
  const db = drizzle(conn);

  const results: Post[] = await db
    .select({
      post: posts.post,
      author: users.name,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id));

  return results;
}
