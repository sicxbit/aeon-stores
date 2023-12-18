import { mongooseConnect } from "../lib/mongoose";
import mongoose from "mongoose";

export default async function handler(req, res) {
    try {
        await mongooseConnect();

        if (req.method === "GET") {
            const featuredProduct = await mongoose.connection.collection('featuredproducts').findOne();

            if (!featuredProduct) {
                return res.status(404).json({ error: "Featured product not found" });
            }

            const featuredProductId = featuredProduct.productId.toString();

            return res.json({ success: true, featuredProduct: featuredProductId });
        } else if (req.method === "POST") {
            const { productId } = req.body;

            if (!productId) {
                return res.status(400).json({ error: "Product ID is required" });
            }

            const objectId = new mongoose.Types.ObjectId(productId);

            await mongoose.connection.collection('featuredproducts').updateOne({}, { $set: { productId: objectId } }, { upsert: true });

            return res.json({ success: true, featuredProduct: objectId });
        } else {
            return res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}