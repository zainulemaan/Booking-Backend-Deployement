const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const hotelController = require("../controllers/hotelController");

router.post("/createHotel", upload.single("photo"), hotelController.addHotel);
router.get("/getHotels", hotelController.getHotelsByCity);

module.exports = router;
