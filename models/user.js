const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "required_username"],
      minlength: 5,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "required_email"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid_email"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "required_password"],
    },
    name: {
      type: String,
      trim: true,
      default: null,
    },
    isAgreedTerm: {
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

module.exports = mongoose.model("user", user);
