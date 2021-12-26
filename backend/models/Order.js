const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        shop: { type: String, required: true },
        category: { type: String, required: true },
      },
    ],
    shippingAddress: {
      fname: { type: String, required: true },
      lname: { type: String, required: true },
      province: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      city: { type: String, required: true },
      surbub: { type: String, required: true },
      streetAddress: { type: String, required: true },
      nextTo: { type: String, required: true },
      zipCode: { type: String, rquired: true },
      email: { type: String, rquired: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    tax: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    status: {
      isProcessing: {
        type: Boolean,
        required: true,
        default: false,
      },
      isShipped: {
        type: Boolean,
        required: true,
        default: false,
      },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    cancellation: {
      status: {
        type: Boolean,
        default: false,
      },
      reason: {
        type: String,
        default: "",
      },
    },
    currentStatus: {
      type: String,
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
