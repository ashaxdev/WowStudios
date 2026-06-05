import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  youtubeId: string;
  category: string;
  description?: string;
  featured: boolean;
  createdAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true, trim: true },
    youtubeId: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
