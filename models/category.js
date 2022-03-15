const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema({
    categoryName: {
        type: String,
        trim: true,
        require: true,
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    firstClosureDate: {
        type: Date,
        default: Date.now(),
    },
    finalClosureDate: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("category", category);