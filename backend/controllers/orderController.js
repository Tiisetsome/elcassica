const Order = require("../models/Order");
const sendOrderConfirmation = require("../utils/orderConfirmationEmail");

const order_single = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Something went wrong, order not found!");
  }
};

const orders_all = async (req, res) => {
  const orders = await Order.find().populate({
    path: "orderItems",
    populate: {
      path: "product",
      select: "stockPrice",
    },
  });
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("Something went wrong, orders not found!");
  }
};

const order_user = async (req, res) => {
  const userOrders = await Order.find({ user: req.params.id });
  if (userOrders) {
    res.status(200).json(userOrders);
  } else {
    res.status(404);
    throw new Error("Something went wrong, orders not found!");
  }
};

const order_create = async (req, res) => {
  const newOrder = await new Order({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    totalPrice: req.body.totalPrice,
  }).save();

  if (newOrder) {
    res.status(201).json(newOrder);
  } else {
    res.status(404).json({
      message: "Something went wrong, order not placed!",
    });
  }
};

const order_delete = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.status(200).json({
      message: "Order removed",
    });
  } else {
    res.status(404);
    throw Error("Something went wrong, order not removed!");
  }
};

const order_update_payment_status = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    isPaid: true,
  });

  if (order) {
    const updatedOrder = await Order.findById(req.params.id).populate({
      path: "user",
      select: { name: 1, lastName: 1, email: 1 },
    });
    sendOrderConfirmation(
      updatedOrder.user,
      updatedOrder._id,
      updatedOrder.shippingAddress
    );
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Something went wrong, order not updated!");
  }
};

const order_cancel = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    cancellation: {
      status: true,
      reason: req.body.reason,
    },
  });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Something went wrong, order not updated!");
  }
};

const order_update_shipping = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    shippingAddress: req.body,
  });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Something went wrong, shipping address not updated!");
  }
};

const order_update_admin = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body);

  if (order) {
    res.status(200).json({
      message: "Order updated",
    });
  } else {
    res.status(404);
    throw new Error("Something went wrong, order not updated!");
  }
};

module.exports = {
  order_create,
  order_single,
  orders_all,
  order_user,
  order_delete,
  order_update_payment_status,
  order_update_shipping,
  order_cancel,
  order_update_admin,
};
