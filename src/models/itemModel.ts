import mongoose, { Document, Schema } from 'mongoose';

// Interface for Item document structure
interface IItem extends Document {
  name: string;
  image: string;
  description: string;
  taxApplicability: boolean;
  tax?: number;
  baseAmount: number;
  discount: number;
  totalAmount: number;
  subCategoryId?: mongoose.Schema.Types.ObjectId;
  categoryId?: mongoose.Schema.Types.ObjectId;
}

// Item model Schema
const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, required: true },
  tax: { type: Number },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  subCategoryId: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
});

export default mongoose.model<IItem>('Item', ItemSchema);
