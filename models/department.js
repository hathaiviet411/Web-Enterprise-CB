const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const department = new Schema({
  departmentName: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("department", department);
