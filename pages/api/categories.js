export default async function handle(req, res) {
    const { method } = req;
    try {
        await mongooseConnect();

        if (method === 'GET') {
            const categories = await Category.find().populate('parent');
            res.json(categories);
        }
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
