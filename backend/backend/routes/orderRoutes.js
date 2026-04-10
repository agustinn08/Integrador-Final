const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder } = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

router.get('/', verifyAdmin, getAllOrders);
router.post('/', verifyToken, createOrder);

module.exports = router;
