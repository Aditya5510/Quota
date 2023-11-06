const express = require('express')

const blogModel = require('../Models/blogModel.js');
const userModel = require('../Models/userModel.js');
const { mongoose } = require('mongoose');
const commentsModel = require('../Models/blogComments.js');
// const { getAllBlog, addBlog, UpdateBlogById, getBlogById, DeleteBlogById } = require("../controllers/BlogController.js")

const router = express.Router()





const getAllblog = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const user = req.query.cuser
        // Get the requested page from the query parameters, default to page 1
        // Set the number of blog posts per page (adjust as needed)
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        // Query the database to fetch paginated blog posts
        const blogs = await blogModel
            .find()
            .skip(skip)
            .limit(limit)
            .populate('user'); // You can use `.populate` if you want to populate the "user" field

        const blogCount = await blogModel.countDocuments(); // Get the total count of blog posts
        const blogsWithLikes = blogs.map((blog) => {
            const likedByCurrentUser = blog.likedBy.includes(user); // Check if the current user liked the blog
            return {
                _id: blog._id,
                title: blog.title,
                content: blog.content,
                user: blog.user,
                createdAt: blog.createdAt,
                likes: blog.likes,
                likedByCurrentUser: likedByCurrentUser, // Include whether the current user likes the blog
            };
        });
        res.status(200).json({
            blogCount: blogsWithLikes.length,
            message: 'All blogs list',
            success: true,
            blogCount,
            currentPage: page,
            totalPages: Math.ceil(blogCount / limit),
            blogs: blogsWithLikes,
        });




    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false, error });
    }
};

const addBlog = async (req, res) => {
    try {
        const { title, content, Image, user } = req.body
        //validate the data

        if (!title || !content || !Image || !user) {
            return res.status(400).send({ message: "Please fill all the fields", success: false })
        }

        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(400).send({ message: "User does not exists", success: false })
        }


        const blog = new blogModel({ title, content, Image, user })

        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })

        existingUser.blogs.push(blog)
        await existingUser.save({ session })
        await session.commitTransaction()

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
        const blog = await blogModel.findByIdAndDelete(id).populate("user")

        if (!blog) {
            return res.status(400).send({ message: "No blog found", success: false })
        }

        await blog.user.blogs.pull(blog);
        await blog.user.save();


        return res.status(200).send({ message: "Blog deleted successfully", success: true, blog })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Error while deleting the blog", success: false, error })
    }
}

const GetBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id).populate("user")
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



const userBlog = async (req, res) => {

    try {
        const { id } = req.params
        const userblog = await userModel.findById(id).populate("blogs");
        if (!userblog) {
            return res.status(401).send({
                message: "no blogs associated with this id",
                success: "false"
            })
        }

        return res.status(200).send({
            success: "true",
            message: "user blogs found",
            userblog
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Server Error", success: false, error })
    }
}
const likes = async (req, res) => {
    try {
        // Get the authenticated user's ID
        const userId = req.query.Uid; // Keep it as a string

        const blogId = req.query.Bid; // Keep it as a string

        // Find the blog post by ID
        const blog = await blogModel.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', success: false });
        }

        // Check if the user has already liked the post
        if (blog.likedBy.includes(userId)) {
            if (blog.likes !== 0) {
                blog.likes -= 1;
                blog.likedBy.pop(userId)
                await blog.save();
                return res.status(200).json({ message: 'unliked', success: true, likes: blog.likes, likedByCurrentUser: false });
            }
            blog.likes = 0;
            blog.likedBy.pop(userId)
            await blog.save();
            return res.status(400).json({ message: 'unliked', success: true, likes: blog.likes, likedByCurrentUser: false });
        }

        // Increment the likes count and add the user's ID as an ObjectId to the likedBy array
        blog.likes += 1;
        blog.likedBy.push(new mongoose.Types.ObjectId(userId)); // Use the 'new' keyword

        // Save the updated blog post
        await blog.save();

        res.status(200).json({ message: 'Blog post liked successfully', success: true, likes: blog.likes, likedByCurrentUser: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while liking the blog post', success: false, error });
    }
}

const comments = async (req, res) => {
    try {
        const { BlogId, UserId, content } = req.body

        const blog = await blogModel.findById(BlogId)
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', success: false });
        }
        const newComment = await commentsModel({
            text: content,
            user: UserId,
            blog: BlogId,
        });
        await newComment.save();
        return res.status(201).json({ message: 'Comment created successfully', success: true, comment: newComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while creating the comment', success: false, error });
    }

}

const getComments = (req, res) => {
    const { id } = req.params;
    commentsModel.find({ blog: id })
        .populate('user')
        .then((comments) => {
            return res.status(200).json({ message: 'Comments fetched successfully', success: true, comments });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: 'Error while fetching comments', success: false, error });
        });
}



router.get('/all-blog', getAllblog)

router.post('/add-blog', addBlog)

router.put('/update-blog/:id', UpdateBlogById)

router.delete('/delete-blog/:id', DeleteBlogById)

router.get('/get-blog/:id', GetBlogById)

router.get('/user-blog/:id', userBlog)

router.post('/like-blog', likes)

router.post('/comment-blog', comments)

router.get('/get-comments/:id', getComments)



module.exports = router