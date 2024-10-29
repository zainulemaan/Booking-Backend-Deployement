const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const productController = require("../controllers/productController");

router.post(
  "/createProduct",
  upload.single("productPhoto"),
  productController.addProduct
);
router.get("/getProducts", productController.getProduct);

module.exports = router;
