const app = require("./app");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// using the port from the environment variable.
const port = process.env.PORT || 3000;

// MongoDB connection string
const mongoDB = process.env.MONGODB_URI;

// enabling CORS for all routes
app.use(
  cors({
    origin: "*", // Allow all origins.
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  })
);

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
