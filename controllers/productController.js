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
  
  // Get single product by ID
  const getProductById =  async (req, res) => {
    
    try {
      const {id} = req.params;
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  };
  
  // Update product by ID
  const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const { name, price, category } = req.body;
    try {
      const product = await Product.findByIdAndUpdate(
        id,
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
  
  // Delete product by ID
  const deleteProduct =  async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  };
  


// filtering products

const filterProducts =  async (req, res) => {
  const { category, priceMin, priceMax, page, limit } = req.body;
  try {
    let query = {};

    if (category) {
      query.category = category;
    }

    if (priceMin && priceMax) {
      query.price = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;

    const products = await Product.find(query)
      .skip(startIndex)
      .limit(limitNumber);

    const totalCount = await Product.countDocuments(query);

    const pagination = {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / limitNumber),
    };

    res.json({ products, pagination });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

  module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, filterProducts}