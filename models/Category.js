import mongoose, { Schema, model } from 'mongoose';


export const Category = mongoose.models.Category || model('Category', new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: [{ type: Object }],
}));
