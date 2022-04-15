const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRole = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    required: true,
  },
});

module.exports = mongoose.model("userRole", userRole);
