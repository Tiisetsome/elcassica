const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const protect = require("../../middlewares/authMiddleware");
const {
  product_add,
  upload_images,
  product_all,
  product_single,
  product_update,
  product_delete,
} = require("../../controllers/productController");

// @desc    Add a new product
// @route   POST /api/product/
// @access  Private
router.route("/").post(protect, asyncHandler(product_add));

// @desc    Upload Product Images
// @route   POST /api/product/imageUpload
// @access  Private
router.route("/imageUpload").post(protect, asyncHandler(upload_images));

// @desc    Get all products
// @route   GET /api/product/
// @access  Public
router.route("/").get(asyncHandler(product_all));

// @desc    Get a single product
// @route   GET /api/product/
// @access  Public
router.route("/:id").get(asyncHandler(product_single));

// @desc    Update single product
// @route   PUT /api/product/:id
// @access  Private
router.route("/:id").put(protect, asyncHandler(product_update));

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private
router.route("/:id").delete(protect, asyncHandler(product_delete));

module.exports = router;
