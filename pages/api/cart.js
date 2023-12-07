import { Product } from "@/models/Product";
import { mongooseConnect } from "../lib/mongoose";

export default async function handle(req, res) {
    await mongooseConnect();
    const ids = req.body.ids;
    
    try {
        const products = await Product.find({ _id: { $in: ids } });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
