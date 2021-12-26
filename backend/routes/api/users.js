const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  userAuth,
  user_profile,
  user_add,
  user_all,
  user_single,
  user_update,
  user_delete,
  confirm_account,
} = require("../../controllers/userController");
const sendMail = require("../../middlewares/sendMailVerfication");
const protect = require("../../middlewares/authMiddleware");

//@desc    User login
//@route   POST /api/users/login
//@access  Private
router.route("/login").post(asyncHandler(userAuth));

//@desc    Get user profile
//@route   GET /api/users/login
//@access  Private
router.route("/profile").get(protect, asyncHandler(user_profile));

//@desc    Add new user
//@route   POST /api/users/
//@access  Private
router.route("/").post(asyncHandler(user_add));

//@desc    Get all users
//@route   GET /api/users/
//@access  Private
router.route("/").get(protect, asyncHandler(user_all));

//@desc    Get single user
//@route   GET /api/users/:id
//@access  Private
router.route("/:id").get(protect, asyncHandler(user_single));

//@desc    Update single user
//@route   PUT /api/users/:id
//@access  Private
router.route("/:id").put(asyncHandler(user_update));

//@desc    Update User account
//@route   PUT /api/users/:id
//@access  Private
router.route("/userAccount/:id").put(asyncHandler(confirm_account));

//@desc    Delete user
//@route   DELETE /api/users/:id
//@access  Private
router.route("/:id").delete(asyncHandler(user_delete));

module.exports = router;
