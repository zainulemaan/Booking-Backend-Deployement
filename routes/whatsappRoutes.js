const express = require("express");
const router = express.Router();
const whatsappController = require("../controllers/whatsappController");

router.post("/sendMessage", whatsappController.sendMessage);

module.exports = router;
