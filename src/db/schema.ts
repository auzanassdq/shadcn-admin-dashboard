import {
  int,
  text,
  timestamp,
  mysqlEnum,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
  
} from "drizzle-orm/mysql-core";
import { relations } from 'drizzle-orm';

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(courses),
}));

export const courses = mysqlTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: text("email"),
  authorId: int("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const coursesRelations = relations(courses, ({ one }) => ({
	author: one(users, {
		fields: [courses.authorId],
		references: [users.id],
	}),
}));



// export const userGetCourse = mysqlTable("user_get_course", {
//   id: serial("id").primaryKey(),
//   userId: int("user_id").references(() => users.id),
//   courseId: int("course_id").references(() => courses.id),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });
