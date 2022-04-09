const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislike = new Schema({
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
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("dislike", dislike);