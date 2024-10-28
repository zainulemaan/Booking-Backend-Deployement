// const { Client, LocalAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose"); // Ensure you import mongoose
// const { MongoDBAdapter } = require("wwebjs-mongo"); // Import MongoDBAdapter
// const catchAsync = require("../utils/catchAsync");

// dotenv.config();

// // Create a MongoDB adapter for session storage
// const mongoAdapter = new MongoDBAdapter(mongoose.connection); // Use the existing MongoDB connection

// // Initialize the WhatsApp client with LocalAuth and MongoDBAdapter
// const client = new Client({
//   authStrategy: new LocalAuth({
//     clientId: "client1", // Optional: Unique identifier for the client
//   }),
// });

// // QR code generation
// client.on("qr", (qr) => {
//   console.log("QR Code received, scan it with your phone:");
//   qrcode.generate(qr, { small: true });
// });

// // Client ready event
// client.on("ready", () => {
//   console.log("WhatsApp client is ready!");
// });

// // Initialize the client with the MongoDB adapter
// client.initialize();

// // Sending message
// const sendMessage = catchAsync(async (req, res, next) => {
//   const { name, email, message } = req.body;
//   const myWhatsAppNumber = process.env.WHATSAPP_NUMBER;

//   const whatsappMessage = `
//     New message from your website:
//     Name: ${name}
//     Email: ${email}
//     Message: ${message}
//   `;
//   console.log("Sending message to:", `${myWhatsAppNumber}@c.us`); // Debugging line

//   // Send msg to WhatsApp number
//   await client.sendMessage(`${myWhatsAppNumber}@c.us`, whatsappMessage);
//   res.status(200).send("Message sent to WhatsApp successfully!");
// });

// module.exports = {
//   sendMessage,
// };

// // controllers/whatsappController.js
// const { Client } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const dotenv = require("dotenv");
// const catchAsync = require("../utils/catchAsync");
// const mongoose = require("mongoose");
// const Session = require("../models/sessionModel");

// dotenv.config();

// class MongoAuth {
//   constructor() {
//     // Binding the methods to ensure correct context
//     this.setup = this.setup.bind(this);
//     this.beforeBrowserInitialized = this.beforeBrowserInitialized.bind(this);
//     this.afterBrowserInitialized = this.afterBrowserInitialized.bind(this);
//     this.onAuthenticationNeeded = this.onAuthenticationNeeded.bind(this);
//   }

//   async loadSession() {
//     const sessionData = await Session.findOne(); // Load session data from the database
//     console.log("Loaded session data:", sessionData); // Debug log
//     return sessionData ? JSON.parse(sessionData.data) : null;
//   }

//   async saveSession(sessionId, data) {
//     console.log("Saving session:", sessionId); // Debug log
//     await Session.findOneAndUpdate(
//       { sessionId },
//       { data: JSON.stringify(data) },
//       { upsert: true }
//     );
//   }

//   async clearSession(sessionId) {
//     console.log("Clearing session:", sessionId); // Debug log
//     await Session.deleteOne({ sessionId });
//   }

//   async setup(client) {
//     const session = await this.loadSession();
//     if (session) {
//       console.log("Loading session..."); // Debug log
//       client.loadAuthInfo(session);
//     }
//     client.on("authenticated", (session) => {
//       console.log("Authenticated successfully!"); // Debug log
//       this.saveSession("default", session);
//     });
//     client.on("auth_failure", async () => {
//       console.error("Authentication failure!"); // Debug log
//       await this.clearSession("default");
//     });
//   }

//   async beforeBrowserInitialized(client) {
//     const session = await this.loadSession();
//     if (session) {
//       client.loadAuthInfo(session);
//     }
//   }

//   async afterBrowserInitialized(client) {
//     console.log("Browser has been initialized."); // Debug log
//   }

//   async onAuthenticationNeeded() {
//     // You may customize the authentication logic here
//     return {
//       failed: false,
//       failureEventPayload: null,
//       restart: false,
//     };
//   }
// }

// // Initialize the WhatsApp client
// const client = new Client({
//   authStrategy: new MongoAuth(), // Use the MongoDB auth strategy
// });

// // QR code generation
// client.on("qr", (qr) => {
//   console.log("QR Code received, scan it with your phone:");
//   qrcode.generate(qr, { small: true });
// });

// // Error event listener
// client.on("error", (error) => {
//   console.error("Client Error:", error);
// });

// // Client ready event
// client.on("ready", () => {
//   console.log("WhatsApp client is ready!");
// });

// // Initialize client
// client.initialize();

// // Sending message
// const sendMessage = catchAsync(async (req, res, next) => {
//   const { name, email, message } = req.body;
//   const myWhatsAppNumber = process.env.WHATSAPP_NUMBER;

//   const whatsappMessage = `
//     New message from your website:
//     Name: ${name}
//     Email: ${email}
//     Message: ${message}
//   `;
//   console.log("Sending message to:", `${myWhatsAppNumber}@c.us`); // Debug

//   // Send message to WhatsApp number
//   await client.sendMessage(`${myWhatsAppNumber}@c.us`, whatsappMessage);
//   res.status(200).send("Message sent to WhatsApp successfully!");
// });

// module.exports = {
//   sendMessage,
// };

// const { Client, LocalAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const dotenv = require("dotenv");
// const catchAsync = require("../utils/catchAsync");

// dotenv.config();

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// // QR code generation
// client.on("qr", (qr) => {
//   console.log("QR Code received, scan it with your phone:");
//   qrcode.generate(qr, { small: true });
// });

// // Client ready event
// client.on("ready", () => {
//   console.log("WhatsApp client is ready!");
// });

// // Initialize client
// client.initialize();

// // Sending msg
// const sendMessage = catchAsync(async (req, res, next) => {
//   const { name, email, message } = req.body;
//   const myWhatsAppNumber = process.env.WHATSAPP_NUMBER;

//   const whatsappMessage = `
//     New message from your website:
//     Name: ${name}
//     Email: ${email}
//     Message: ${message}
//   `;
//   console.log("Sending message to:", `${myWhatsAppNumber}@c.us`); // Debugging line

//   // Send msg to WhatsApp number
//   await client.sendMessage(`${myWhatsAppNumber}@c.us`, whatsappMessage);
//   res.status(200).send("Message sent to WhatsApp successfully!");
// });

// module.exports = {
//   sendMessage,
// };
