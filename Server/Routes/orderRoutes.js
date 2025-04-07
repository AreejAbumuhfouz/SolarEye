// const express = require('express');
// const router = express.Router();
// const orderController = require('../Controller/orderController');
// const authMiddleware = require('../config/authMiddleware');

// // POST: Create a new order (Protected)
// router.post('/orders', authMiddleware,orderController.createOrder);


// module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders,updateOrderStatus } = require('../Controller/orderController');
const authMiddleware = require('../config/authMiddleware');

// Route for creating an order
router.post('/orders', authMiddleware, createOrder);

// Route for getting orders of the authenticated user
router.get('/orders/user', authMiddleware, getUserOrders);
router.patch('/orders/update-status', updateOrderStatus);

// Route for getting all orders (admin or other purposes)
router.get('/orders', getAllOrders);

module.exports = router;
