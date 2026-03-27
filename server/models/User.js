const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserId: Number,
  FirstName: String,
  LastName: String,
  Login: String,
  Password: String,
});

module.exports = mongoose.model("User", userSchema, "MERN Users");