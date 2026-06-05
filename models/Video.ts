import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  youtubeId: string;
  category: string;
  description?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeId: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Video: Model<IVideo> =
  mongoose.models.Video ||
  mongoose.model<IVideo>('Video', VideoSchema);

export default Video;