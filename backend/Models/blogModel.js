const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: [true, "Please add a title"],
    },
    content: {
        type: "String",
        required: [true, "Please add a content"],
    },
    Image: {
        type: "String",
        required: [true, "Please add a Image"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "User is required"]
    }


}, { timestamps: true });

const blogModel = mongoose.model("Blog", BlogSchema);
module.exports = blogModel;