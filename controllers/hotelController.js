const Hotel = require("../models/hotelsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.addHotel = catchAsync(async (req, res, next) => {
  // Getting All Data
  const { name, location, description, city, ratings, numberOfReviews } =
    req.body;

  // converting rooms data from JSON string to object
  let rooms;
  try {
    rooms = JSON.parse(req.body.rooms); // Converting rooms from string to array of objects
  } catch (error) {
    return next(new AppError("Invalid rooms data format.", 400));
  }

  // Applying a check
  if (
    !name ||
    !location ||
    !description ||
    !rooms ||
    !ratings ||
    !numberOfReviews ||
    !city ||
    !req.file
  ) {
    return next(
      new AppError("Please provide all required data, including the photo."),
      400
    );
  }

  // Now Create Hotel
  const newHotel = await Hotel.create({
    name,
    location,
    description,
    rooms,
    ratings,
    numberOfReviews,
    city,
    photo: req.file.path,
  });

  res.status(201).json({
    status: "success",
    data: {
      newHotel,
    },
  });
});

// Controller to get hotels by city
exports.getHotelsByCity = catchAsync(async (req, res, next) => {
  // get city from query
  const { city } = req.query;

  // Checking if city is provided
  if (!city) {
    return next(new AppError("Please provide a city to filter hotels.", 400));
  }

  const hotels = await Hotel.find({ city: city });
  // Checking if any hotels were available
  if (!hotels.length) {
    return next(new AppError("No hotels found in this city.", 404));
  }

  res.status(200).json({
    status: "success",
    results: hotels.length,
    data: {
      hotels,
    },
  });
});
