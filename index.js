const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
app.use(cors())
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/webelight-assignment';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Webelight Assignment',
      version: '1.0.0'
    },
    servers:[{
      url: 'http://localhost:3000/'
    }]
  },
  apis: ['./index.js'],  
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))



/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate customer and generate a JWT token
 *     
 *     responses:
 *       '200':
 *         description: Successful login with JWT token
 *    
 */
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register new customer
 *     
 *     responses:
 *       '200':
 *         description: Successful registerd new customer
 *    
 */

/**
 * @swagger
 * /all-customers:
 *   get:
 *     summary: show all the customers details
 *     
 *     responses:
 *       '200':
 *         description: only admin can check details of customers
 *    
 */


/**
 * @swagger
 * /get-allproducts:
 *   get:
 *     summary: show all the products
 *     
 *     responses:
 *       '200':
 *         description: Get all products
 *    
 */

/**
 * @swagger
 * /get-product/:id:
 *   get:
 *     summary: get single product by ID
 *     
 *     responses:
 *       '200':
 *         description: Get product by ID
 *    
 */

/**
 * @swagger
 * /create-product:
 *   post:
 *     summary: Add a new product
 *     
 *     responses:
 *       '200':
 *         description: Add new product
 *    
 */

/**
 * @swagger
 * //update-product/:id:
 *   put:
 *     summary: Update product details
 *     
 *     responses:
 *       '200':
 *         description: update product details
 *    
 */

/**
 * @swagger
 * //delete-product/:id:
 *   delete:
 *     summary: Delete product
 *     
 *     responses:
 *       '200':
 *         description: delete product
 *    
 */

/**
 * @swagger
 * /filter-products:
 *   get:
 *     summary: Filter products and Pagination 
 *     
 *     responses:
 *       '200':
 *         description: Filter products acc to category, price etc.
 *    
 */





const authRoutes = require("./routes/authRoutes")
const productRoutes= require("./routes/productRoutes")
app.use(authRoutes);
app.use(productRoutes)


app.get("/",(req,res)=>{
res.send("Hello Webelight")
})

app.listen(3000,()=>{
    console.log(" server listening on port 3000")
})
