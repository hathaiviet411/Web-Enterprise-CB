const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const role = new Schema({
  roleName: {
    type: String,
    trim: true
  },
});

module.exports = mongoose.model("role", role);