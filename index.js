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
