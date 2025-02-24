import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
    name: string,
    description: string,
    category: mongoose.Types.ObjectId,
    numberInWarehouse: number,
    price: number,
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    numberInWarehouse: { type: Number, required: true },
    price: { type: Number, required: true }
  });
  
  export default mongoose.model<IProduct>('Product', ProductSchema);