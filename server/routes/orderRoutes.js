const express = require("express");
const router = express.Router();
const { placeOrder, getOrders, updateOrderStatus } = require("../controllers/orderController");

router.route("/").post(placeOrder).get(getOrders);
router.route("/:id").put(updateOrderStatus);

module.exports = router;