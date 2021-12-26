const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  cartegory: {
    type: String,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageSwatchesUrl: {
    type: Array,
    default: [],
  },
  imageUrlState: {
    type: Object,
    default: {},
  },
  imageSwatchesUrlState: {
    type: Object,
    default: {},
  },
  sizes: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stockPrice: {
    type: Number,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    value: 0,
  },
  stockKeepingUnit: {
    type: String,
  },
  barcode: {
    type: String,
  },
  new: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
