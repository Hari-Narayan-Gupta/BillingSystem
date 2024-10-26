const Product = require('../models/Product');

// Fetch all products based on search
exports.getProducts = async (req, res) => {
  const searchTerm = req.query.search;
  try {
      const products = await Product.find({
          name: { $regex: searchTerm, $options: 'i' }, // Case-insensitive search
      });
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).json({message: "Product Added successfully"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};
