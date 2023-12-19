import { Product } from "@/models/Product";
import { mongooseConnect } from "../lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  const { category, categories } = req.query;
  if (category || categories) {
    const categoryId = category || categories;
    res.json(await Product.find({ category: categoryId }));
  } else {
    res.json(await Product.find());
  }
}
