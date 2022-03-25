const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const idea = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department',
        require: true,
    },
    ideaContent: {
        type: String,
        trim: true,
        require: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    ideaFile: [{
        type: String,
        trim: true,
    }],
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

module.exports = mongoose.model('idea', idea);