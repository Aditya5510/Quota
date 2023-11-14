const express = require('express')

const blogModel = require('../Models/blogModel.js');
const userModel = require('../Models/userModel.js');
const { mongoose } = require('mongoose');
const commentsModel = require('../Models/blogComments.js');
const messageModel = require('../Models/messageModel.js');
// const { getAllBlog, addBlog, UpdateBlogById, getBlogById, DeleteBlogById } = require("../controllers/BlogController.js")

const router = express.Router()
const sendMessage = async (req, res) => {

    try {
        const { from, to, message } = req.body;
        const newMessage = new messageModel({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        await newMessage.save()
        res.status(200).send({ message: "Message sent successfully", success: true, newMessage })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server Error", success: false, error })
    }

}

const getMessages = async (req, res) => {

    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
        const newMessage = messages.map(msg => {
            return {
                fromself: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.status(200).send({ message: "Message received successfully", success: true, newMessage })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server Error", success: false, error })
    }

}




router.post('/send-message', sendMessage)

router.post('/get-message', getMessages)





module.exports = router