const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const protect = require("../../middlewares/authMiddleware");
const {
  order_create,
  order_single,
  orders_all,
  order_user,
  order_delete,
  order_update_payment_status,
  order_update_shipping,
  order_cancel,
  order_update_admin,
} = require("../../controllers/orderController");
const sendMail = require("../../middlewares/sendMailVerfication");
const router = express.Router();

//@desc    Create New Order
//@method  POST /api/order/
//@access  private
router.route("/").post(protect, expressAsyncHandler(order_create));

//@desc    Get All Orders
//@method  GET /api/order/
//@access  private
router.route("/").get(protect, expressAsyncHandler(orders_all));

//@desc    Get All Orders
//@method  GET /api/order/
//@access  private
router.route("/:id").get(protect, expressAsyncHandler(order_single));

//@desc    Get Orders Associated With The User
//@method  GET /api/order/user/:id
//@access  private
router.route("/user/:id").get(protect, expressAsyncHandler(order_user));

//@desc    Update order
//@method  PUT /api/order/:id
//@access  private
router
  .route("/:id")
  .put(protect, expressAsyncHandler(order_update_payment_status));

//@desc    Update Shipping Address
//@method  PUT /api/order/shipping/:id
//@access  private
router
  .route("/shipping/:id")
  .put(protect, expressAsyncHandler(order_update_shipping));

//@desc    Cancel Order
//@method  PUT /api/order/cancel/:id
//@access  private
router.route("/cancel/:id").put(protect, expressAsyncHandler(order_cancel));

//@desc    Update Any Order Changes By Admin
//@method  PUT /api/order/update/:id
//@access  private
router
  .route("/update/:id")
  .put(protect, expressAsyncHandler(order_update_admin));

//@desc    Delete order
//@method  DELETE /api/order/:id
//@access  private
router.route("/:id").delete(protect, expressAsyncHandler(order_delete));

module.exports = router;
