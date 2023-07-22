const Product = require("../models/product")


// Create a new product
const createProduct =  async (req, res) => {
    const { name, price, category } = req.body;
    try {
      const product = new Product({ name, price, category });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: 'Error creating product' });
    }
  };
  
  // Get all products
  const getAllProducts =  async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  };
  
  // Get a specific product by ID
  const getProductById =  async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  };
  
  // Update a product by ID
  const updateProduct =  async (req, res) => {
    const { productId } = req.params;
    const { name, price, category } = req.body;
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        { name, price, category },
        { new: true } // Return the updated product
      );
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Error updating product' });
    }
  };
  
  // Delete a product by ID
  const deleteProduct =  async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  };
  

  module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct}