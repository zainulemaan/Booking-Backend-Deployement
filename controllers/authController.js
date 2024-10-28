const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const jwt = require("jsonwebtoken");

const signToken = (userId) => {
  return jwt.sign({ id: userId }, "my-ultra-secure-if-gture-how-thereee-the", {
    expiresIn: "5d",
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return next(new AppError("Please Provide All The Details Thanks!", 400));
  }

  //   Creating User
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});
