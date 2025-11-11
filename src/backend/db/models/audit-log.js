"use server";

import mongoose, { Schema } from "mongoose";

const AuditLogSchema = new Schema(
  {
    actor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    details: Schema.Types.Mixed,
  },
  { timestamps: { createdAt: "timestamp", updatedAt: false } }
);

export default mongoose.models.AuditLog ||
  mongoose.model("AuditLog", AuditLogSchema);

