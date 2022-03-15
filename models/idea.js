const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const idea = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    ideaContent: {
        type: String,
        trim: true,
        require: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    dislikeCount: {
        type: Number,
        default: 0,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("idea", idea);