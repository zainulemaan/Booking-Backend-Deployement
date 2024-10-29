const Product = require("../models/productModel");
const multer = require("../utils/multer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.addProduct = catchAsync(async (req, res, next) => {
  const { productName, productPrice, discountedPrice, ratings, reviewCount } =
    req.body;

  // Check
  if (
    !productName ||
    !productPrice ||
    !discountedPrice ||
    ratings === undefined ||
    !reviewCount
  ) {
    return next(new AppError("Please provide All The Details"), 400);
  }

  const product = await Product.create({
    productName,
    productPrice,
    discountedPrice,
    ratings,
    reviewCount,
    productPhoto: req.file.path,
  });

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // Find  all products
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
