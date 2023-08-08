CREATE TABLE `courses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` text,
	`author_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`author_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `author_id_idx` ON `posts` (`author_id`);