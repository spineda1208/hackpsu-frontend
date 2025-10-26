import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const videoStream = pgTable("video_stream", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  deviceName: text("device_name").notNull(),
  deviceType: text("device_type").default("mobile").notNull(),
  status: text("status").default("offline").notNull(), // online, offline, streaming
  lastSeen: timestamp("last_seen"),
  metadata: text("metadata"), // JSON string for resolution, fps, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
