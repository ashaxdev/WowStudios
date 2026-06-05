import mongoose, { Schema, Document } from 'mongoose';

export interface IPhoto extends Document {
  category: string;
  imageUrl: string;
  publicId: string;
  createdAt: Date;
}

const PhotoSchema = new Schema<IPhoto>(
  {
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model<IPhoto>('Photo', PhotoSchema);