const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const jwt = require("jsonwebtoken");
const { findOne, create } = require("../models/hotelsModel");
require("dotenv").config();

const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Setting cookies
  const cookies = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    // secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookies);

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return next(new AppError("Please Provide All The Details Thanks!", 400));
    }

    // Creating User
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    console.error("Error in register route:", error); 
    next(error);
  }
});

// Login controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check for both email and password are provided are not
  if (!email || !password) {
    return next(new AppError("Please Provide both email and password."), 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password."), 401);
  }

  createSendToken(user, 200, res);
});
