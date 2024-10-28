const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

sessionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
