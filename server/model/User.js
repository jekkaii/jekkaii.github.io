const mongoose = require("mongoose");

// Mongoose model for database
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
