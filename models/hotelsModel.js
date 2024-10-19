const mongoose = require("mongoose");
// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  rooms: [
    {
      roomtype: {
        type: String,
        enum: ["Single", "Double", "Suite"],
        required: true,
        default: "Single",
      },
      priceperNight: {
        type: Number,
        required: true,
      },
      availableRooms: {
        type: Number,
        required: true,
        default: 0,
      },
      maxOccupancy: {
        type: Number,
        required: true,
      },
      amenities: {
        type: [String],
        default: [
          "Air Conditioning",
          "Flat-screen TV",
          "WiFi",
          "Private Bathroom",
          "Towels",
          "Free Toiletries",
          "Bathrobe",
          "Slippers",
          "Desk",
          "Iron",
          "Telephone",
          "Wardrobe/Closet",
          "Heating",
          "Wake-up Service",
        ],
      },
    },
  ],
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Hotel", hotelSchema);
