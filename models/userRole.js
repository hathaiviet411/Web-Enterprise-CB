const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRole = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
  },
});

module.exports = mongoose.model("userRole", userRole);
