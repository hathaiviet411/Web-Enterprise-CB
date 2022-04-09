const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    idea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "idea",
      required: true,
    },
    commentContent: {
      type: String,
      trim: true,
      require: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("comment", comment);
