import mongoose, { Document, Schema } from 'mongoose';

// Interface for category document structure
interface ICategory extends Document {
  name: string;
  image: string;
  description: string;
  taxApplicability: boolean;
  tax?: number;
  taxType?: string;
}

// Category model Schema
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, required: true },
  tax: { type: Number },
  taxType: { type: String }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
