CREATE TABLE IF NOT EXISTS "kihub_likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kihub_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "status",
	"content" varchar(1024) NOT NULL,
	"author_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kihub_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"username" varchar(256) NOT NULL,
	"picture" varchar(256),
	"kinde_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"biography" varchar(1024),
	"date_of_birth" timestamp with time zone,
	CONSTRAINT "kihub_users_email_unique" UNIQUE("email"),
	CONSTRAINT "kihub_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "kihub_likes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "post_id_idx" ON "kihub_likes" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "author_id_idx" ON "kihub_posts" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "kihub_users" USING btree ("first_name");