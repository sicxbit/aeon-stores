import { mongooseConnect } from "@/pages/lib/mongoose"
import { Category } from "@/models/Category"

export default async function handle(req, res) {
    const { method } = req
    await mongooseConnect();
    
    if (method === 'GET') {
        res.json(await Category.find().populate("parent"));
    }
}