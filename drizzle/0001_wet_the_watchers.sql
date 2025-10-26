CREATE TABLE "alert" (
	"id" text PRIMARY KEY NOT NULL,
	"stream_id" text NOT NULL,
	"severity" text NOT NULL,
	"message" text NOT NULL,
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_stream" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"device_name" text NOT NULL,
	"device_type" text DEFAULT 'mobile' NOT NULL,
	"status" text DEFAULT 'offline' NOT NULL,
	"last_seen" timestamp,
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "alert" ADD CONSTRAINT "alert_stream_id_video_stream_id_fk" FOREIGN KEY ("stream_id") REFERENCES "public"."video_stream"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_stream" ADD CONSTRAINT "video_stream_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;