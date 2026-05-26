import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
