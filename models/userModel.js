const mongoose = require("mongoose");
const { emit } = require("../app");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.validate(v);
      },
      message: (props) => `${props.v} is not a valid email.thanks!`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 8;
      },

      message: (props) => `Password must be 8 characters long.`,
    },
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length >= 8;
      },

      message: (props) => `Password must be 8 characters long.`,
    },
  },
  // role: {
  //   type: String,
  //   required: true,
  //   enum: ["Student", "Instructor", "Admin"],
  //   default: "Student",
  // },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
