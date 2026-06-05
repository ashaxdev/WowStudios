import mongoose, { Schema, Document } from 'mongoose';

export interface IPhoto extends Document {
  title: string;
  category: string;
  imageUrl: string;
  publicId: string;
  description?: string;
  featured: boolean;
  createdAt: Date;
}

const PhotoSchema = new Schema<IPhoto>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    description: { type: String, trim: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model<IPhoto>('Photo', PhotoSchema);
