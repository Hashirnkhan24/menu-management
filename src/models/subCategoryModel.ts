import mongoose, { Document, Schema } from 'mongoose';

// Sub Category Document interface
interface ISubCategory extends Document {
  name: string;
  image: string;
  description: string;
  taxApplicability: boolean;
  tax?: number;
  categoryId: mongoose.Schema.Types.ObjectId;
}

// SubCategory model Schema
const SubCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean },
  tax: { type: Number },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

export default mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);
