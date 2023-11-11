const mongoose = require('mongoose');

const blogCommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
}, { timestamps: true });

const Comment = mongoose.model('Comment', blogCommentSchema);
module.exports = Comment;
