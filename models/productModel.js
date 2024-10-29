const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "A Product Must Have A Price"],
  },
  productPrice: {
    type: Number,
    required: [true, "A Product Must Have A Price"],
  },
  discountedPrice: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 20,
    required: true,
  },
  productPhoto: {
    type: String,
    required: [true, "A Product Must Have A Photo"],
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
