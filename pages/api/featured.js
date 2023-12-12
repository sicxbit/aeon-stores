import { mongooseConnect } from "@/lib/mongoose";
import FeaturedProduct from "@/models/FeaturedProduct";

export default async function handler(req, res) {
  try {
    await mongooseConnect();

    const featuredProduct = await FeaturedProduct.findOne();

    if (!featuredProduct) {
      return res.status(404).json({ error: "Featured product not found" });
    }

    return res.json(featuredProduct);
  } catch (error) {
    console.error("Error fetching featured product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
