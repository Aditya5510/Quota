const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    username: {
        type: "String",
        required: [true, "Please add a username"],

    },
    email: {
        type: "String",
        required: [true, "Please add a email"],
    },
    password: {
        type: "String",
        required: [true, "Please add a password"],
    },
    Profile: {
        type: "String",
        required: [false, "Please add image"],
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    },
    ],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    friendRequests: [{
        type: String,
    }],
    friendSenders: [{
        type: String
    }],

}, { timestamps: true });

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;