const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserId: Number,
  FirstName: String,
  LastName: String,
  Email: String,
  Login: String,
  Password: String,
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", userSchema, "MERN Users");
