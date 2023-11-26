const mongoose = require("mongoose");

// Define the schema for your data
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be minimum  8 characters"],
  },
  name: {
    type: String,
    required: true,
    minlength: [3, "Please enter more than 3 characters"],
  },
  favouritemovie: {
    type: String,
    required: true,
    minlength: [3, "Please enter more than 3 characters"],
  },
  role: {
    type: String,
    default:'user'
  },
});

// Create a model using the schema
module.exports = mongoose.model("User", UserSchema);
