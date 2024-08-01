CREATE TYPE status AS ENUM ('pb', 'ar');

ALTER TABLE "kihub_posts" ADD COLUMN "status" "status" DEFAULT 'pb' NOT NULL;