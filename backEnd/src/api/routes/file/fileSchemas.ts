import mongoose, { Schema } from "mongoose";

export const fileSchema = new Schema({
  filename: { type: String, required: true },
  mimeType: { type: String },
  size: { type: Number },
  path: { type: String },
  downloadToken: { type: String },
  expiresAt: { type: Date },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export const FileModel = mongoose.model("File", fileSchema);