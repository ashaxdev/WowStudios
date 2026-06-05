import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  price?: string;
  imageUrl?: string;
  imagePublicId?: string;
  features: string[];
  icon?: string;
  published: boolean;
  order: number;
  createdAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: String, trim: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    features: [{ type: String, trim: true }],
    icon: { type: String, trim: true },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
