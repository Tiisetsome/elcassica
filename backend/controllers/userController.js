const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const sendMail = require("../utils/email");
const generateToken = require("../utils/generateToken");

const userAuth = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user && (await user.matchPassword(req.body.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

const user_profile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmailConfirmed: user.isEmailConfirmed,
    });
  } else {
    res.status(404);
    throw new Error("Something went wrong, user not found!");
  }
};

const user_add = async (req, res) => {
  const newUser = await new User({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10),
  }).save();
  if (newUser) {
    sendMail(newUser.id, newUser.email, newUser.name, newUser.lastName);
    res.status(200).json({ added: true });
  } else {
    res.status(404);
    throw new Error("Something went wrong, user not added!");
  }
};

const user_all = async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Something went wrong, users not found!");
  }
};

const user_single = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("Something went wrong, user not found!");
  }
};

const user_update = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
  if (updateUser) {
    res.status(200).json(updateUser);
  } else {
    res.status(404);
    throw new Error("Something went wrong, user not updated!");
  }
};

const confirm_account = async (req, res) => {
  const updateUserAccount = await User.findByIdAndUpdate(req.params.id, {
    isEmailConfirmed: true,
  });
  if (updateUserAccount) {
    res.status(200).json({ updated: true });
  } else {
    res.status(404);
    throw new Error("Something went wrong, user Email not confirmed!");
  }
};

const user_delete = async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  if (deleteUser) {
    res.status(200).json({
      message: "User deleted",
      deleted: true,
    });
  } else {
    res.status(404);
    throw new Error("Something went wrong, user not deleted");
  }
};

module.exports = {
  userAuth,
  user_profile,
  user_add,
  user_all,
  user_single,
  user_update,
  confirm_account,
  user_delete,
};
