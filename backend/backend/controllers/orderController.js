const Order = require('../models/Order');

// GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'fullname email').populate('products.productId', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { totalPrice, user, products, status } = req.body;

    const order = new Order({ totalPrice, user, products, status });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllOrders, createOrder };
