const express = require('express')

const blogModel = require('../Models/blogModel.js');
// const { getAllBlog, addBlog, UpdateBlogById, getBlogById, DeleteBlogById } = require("../controllers/BlogController.js")

const router = express.Router()





const getAllblog = async (req, res) => {
    try {
        const blogs = await blogModel.find({})
        if (!blogs) {
            return res.satatus(200).send({ message: "No blog found", success: false })
        }

        res.status(200).send({
            blogCount: blogs.length,
            message: "All blogs list", success: true, blogs
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Server Error", success: false, error })
    }

}

const addBlog = async (req, res) => {
    try {
        const { title, content, Image } = req.body
        //validate the data

        if (!title || !content || !Image) {
            return res.status(400).send({ message: "Please fill all the fields", success: false })
        }

        const blog = new blogModel({ title, content, Image })
        await blog.save()

        return res.status(201).send({ message: "Blog created successfully", success: true, blog })
    }
    catch (error) {
        console.log(error)
        return res.satatus(500).send({ message: "Error while creating the blog", success: false, error })
    }

}

const UpdateBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, Image } = req.body
        //validate the data
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        if (!blog) {
            return res.status(400).send({ message: "No blog found", success: false })
        }
        return res.status(200).send({ message: "Blog updated successfully", success: true, blog })


    }
    catch (error) {
        console.log(error)
        return res.satatus(500).send({ message: "Error while updating the blog", success: false, error })
    }

}

const DeleteBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findByIdAndDelete(id)
        if (!blog) {
            return res.status(400).send({ message: "No blog found", success: false })
        }
        return res.status(200).send({ message: "Blog deleted successfully", success: true, blog })
    }
    catch (error) {
        console.log(error)
        return res.satatus(500).send({ message: "Error while deleting the blog", success: false, error })
    }
}

const GetBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(400).send({ message: "No blog found", success: false })
        }
        return res.status(200).send({ message: "Blog found successfully", success: true, blog })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Server Error", success: false, error })
    }
}


router.get('/all-blog', getAllblog)

router.post('/add-blog', addBlog)

router.put('/update-blog/:id', UpdateBlogById)

router.delete('/delete-blog/:id', DeleteBlogById)

router.get('/get-blog/:id', GetBlogById)
module.exports = router