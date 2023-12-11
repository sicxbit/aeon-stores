import { Category } from "@/models/Category";
import { mongooseConnect } from "@/pages/lib/mongoose";

export default async function handle(req, res) {
  const {
    method,
    query: { categoryId },
  } = req;

  await mongooseConnect;

  if (method === "GET") {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
