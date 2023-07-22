const express = require("express");
const route = express.Router();
const { authenticateToken , isAdmin} = require("../middlewares/authMiddleware");

const {registerController,loginController, allCustomers} = require("../controllers/authController")

//register
route.post("/register",registerController)

//login
route.post("/login",loginController)

//get all customers

route.get("/all-customers",authenticateToken, isAdmin, allCustomers)

module.exports = route;