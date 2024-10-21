const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const dotenv = require("dotenv");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

dotenv.config();

const client = new Client({
  authStrategy: new LocalAuth(),
});

// QR code generation
client.on("qr", (qr) => {
  console.log("QR Code received, scan it with your phone:");
  qrcode.generate(qr, { small: true });
});

// Client ready event
client.on("ready", () => {
  console.log("WhatsApp client is ready!");
});

// Initialize client
client.initialize();

// Sending msg
const sendMessage = catchAsync(async (req, res, next) => {
  const { name, email, message } = req.body;
  const myWhatsAppNumber = process.env.WHATSAPP_NUMBER;

  const whatsappMessage = `
    New message from your website:
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;
  console.log("Sending message to:", `${myWhatsAppNumber}@c.us`); // Debugging line

  // Send msg to WhatsApp number
  await client.sendMessage(`${myWhatsAppNumber}@c.us`, whatsappMessage);
  res.status(200).send("Message sent to WhatsApp successfully!");
});

module.exports = {
  sendMessage,
};
