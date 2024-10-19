const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelRoutes");

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// handle uploaded images
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Helo From Server");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/hotels", hotelRoutes);

module.exports = app;
