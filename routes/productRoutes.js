const express = require("express");
const { authenticateToken , isAdmin} = require("../middlewares/authMiddleware");
const route = express.Router();
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, filterProducts} = require("../controllers/productController")

//create product
route.post("/create-product",authenticateToken,isAdmin, createProduct);

//update product
route.put("/update-product/:id",authenticateToken, isAdmin,updateProduct);

//get products
route.get("/get-allproducts",getAllProducts);


//get-single-product
route.get("/get-product/:id",getProductById);

// fiter Products

route.get("/filter-products", filterProducts)


//delete-product
route.delete("/delete-product/:id",authenticateToken, isAdmin, deleteProduct)

module.exports = route