const Customer = require("../models/customers");
const jwt = require("jsonwebtoken");


// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, 'secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
  
  // Middleware to check if the customer has admin role
  const isAdmin = async (req, res, next) => {
    const customer = await Customer.findById(req.user._id);
    if (customer.role !== 'admin') return res.sendStatus(403);
    next();
  };

  module.exports = {authenticateToken, isAdmin}