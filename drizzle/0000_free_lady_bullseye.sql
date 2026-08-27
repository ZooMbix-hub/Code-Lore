CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"title" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"glyph" text NOT NULL,
	"description" text NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "sections_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "articles_category_slug_key" ON "articles" USING btree ("category_id","slug");