const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        text: {
            type: "String",
            required: [true, "Please add a title"]
        }
    },
    users: Array,
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "User is required"]
    },

    isRead: {
        type: Boolean,
        default: false,
    },
    isSent: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

const messageModel = mongoose.model("message", messageSchema);
module.exports = messageModel;