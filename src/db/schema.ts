import {
  int,
  text,
  timestamp,
  mysqlEnum,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
  index,
  date,
} from "drizzle-orm/mysql-core";
import { relations, InferModel } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique().notNull(),
  username: varchar("username", { length: 256 }).unique().notNull(),
  city: varchar("city", { length: 256 }),
  birth: date("birth"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export type User = InferModel<typeof users>;

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = mysqlTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    post: varchar("post", { length: 256 }),
    authorId: int("author_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      authorIdIdx: index("author_id_idx").on(table.authorId),
    };
  }
);
export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));

export const courses = mysqlTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: text("email"),
  authorId: int("author_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// export const coursesRelations = relations(courses, ({ one }) => ({
// 	author: one(users, {
// 		fields: [courses.authorId],
// 		references: [users.id],
// 	}),
// }));

// export const userGetCourse = mysqlTable("user_get_course", {
//   id: serial("id").primaryKey(),
//   userId: int("user_id").references(() => users.id),
//   courseId: int("course_id").references(() => courses.id),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });
