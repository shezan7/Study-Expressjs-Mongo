const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, OrdersController.orders_get_all);

router.post("/", checkAuth, OrdersController.orders_create_order);

router.get("/:orderId", checkAuth, OrdersController.orders_get_order);

router.delete("/:orderId", checkAuth, OrdersController.orders_delete_order);

module.exports = router;



// const express = require('express')
// const router = express.Router()

// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Order were fetched'
//     })
// })

// router.post('/', (req, res, next) => {
//     res.status(201).json({
//         message: 'Order was created'
//     })
// })

// router.get('/:orderId', (req, res, next) => {
//     res.status(201).json({
//         message: 'Order details',
//         orderId: req.params.orderId
//     })
// })

// router.delete('/:orderId', (req, res, next) => {
//     res.status(201).json({
//         message: 'Order deleted',
//         orderId: req.params.orderId
//     })
// })

// module.exports = router