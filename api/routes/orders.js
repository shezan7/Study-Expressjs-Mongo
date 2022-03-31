const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

const { checkUser } = require("./../middleware/roleValid")


router.use(checkAuth);

router.get("/", checkUser(9), OrdersController.orders_get_all);

router.get("/:id", checkUser(9), OrdersController.orders_get_order);

router.post("/create", checkUser(10), OrdersController.orders_create_order);

router.delete("/delete", checkUser(12), OrdersController.orders_delete_order);


module.exports = router;