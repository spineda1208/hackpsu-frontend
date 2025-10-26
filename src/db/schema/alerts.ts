import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { videoStream } from "./streams";

export const alert = pgTable("alert", {
  id: text("id").primaryKey(),
  streamId: text("stream_id")
    .notNull()
    .references(() => videoStream.id, { onDelete: "cascade" }),
  severity: text("severity").notNull(), // low, medium, high, critical
  message: text("message").notNull(),
  metadata: text("metadata"), // JSON string for ML data (confidence, location, etc.)
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
