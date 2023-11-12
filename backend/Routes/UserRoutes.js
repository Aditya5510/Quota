const express = require('express')
const userModel = require('../Models/userModel.js')
const bcrypt = require('bcrypt')
const blogModel = require('../Models/blogModel.js')
const router = express.Router()
const blogComments = require('../Models/blogComments.js')


//Controllers
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200)
        res.send({
            userCount: users.length,
            message: "All users", success: true, users
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Server Error", success: false, error })
    }

};

const RegisterC = async (req, res) => {
    try {
        const { username, email, password, Profile } = req.body
        //validate the data

        if (!username || !email || !password) {
            return res.status(400).send({ message: "Please fill all the fields" })
        }




        const existingUsers = await userModel.findOne({ email });
        if (existingUsers) {
            return res.status(400).send({ message: "User already exists" })
        }
        //save a new user here

        const hashed_password = bcrypt.hashSync(password, 10)


        const user = new userModel({ username, email, password: hashed_password, Profile })
        await user.save()

        return res.status(201).send({ message: "User created successfully", success: true, user })


    }
    catch (error) {
        console.log(error)

        return res.status(500).send({ message: "Server Error", success: false })

    }
};

const LoginC = async (req, res) => {
    try {
        const { email, password } = req.body
        //validate the data

        if (!email || !password) {
            return res.status(400).send({ message: "Please fill all the fields", success: false })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({ message: "user not regisred", success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid Credentials", success: false })
        }
        return res.status(200).send({ message: "User logged in successfully", success: true, user })


    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Server Error", success: false, error })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(400).send({ message: "User not found", success: false })
        }
        return res.status(200).send({ success: true, user })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Server Error", success: false, error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);

        if (user) {
            // Delete the user's blogs
            await blogModel.deleteMany({ user: user._id });
            await blogComments.deleteMany({ user: user._id });

            // Delete the user
            await userModel.findByIdAndDelete(id);

            return res.status(200).send({ message: "User deleted successfully", success: true });
        } else {
            return res.status(400).send({ message: "User not found", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error while deleting the user and associated blogs", success: false, error });
    }
}

const addFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const { friendId } = req.body;
        const user = await userModel.findById(id);
        const friend = await userModel.findById(friendId);

        if (user && friend) {

            if (friend.friends.includes(id) || user.friends.includes(friendId)) return res.status(400).send({ message: "Already friends", success: false });

            if (user.friendRequests.includes(friendId)) return res.status(400).send({ message: "Friend request already sent", success: false });

            // Add the user to the friend's friends list
            friend.friendSenders.push(id);
            user.friendRequests.push(friendId);
            await friend.save();
            await user.save();

            return res.status(200).send({ message: "Friend Request sent successfully", success: true });
        } else {
            return res.status(400).send({ message: "User or friend not found", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error while adding friend", success: false, error });
    }

}

const getFriendRequest = async (req, res) => {

    try {
        const { id } = req.params;
        const { friendId, ans } = req.body;

        const user = await userModel.findById(id);
        const friend = await userModel.findById(friendId);
        if (ans === "true") {
            user.friends.push(friendId);
            friend.friends.push(id);
            user.friendSenders.pop(friendId);
            friend.friendRequests.pop(id);
            await user.save();
            await friend.save();
            return res.status(200).send({ message: "Friend added successfully", success: true });
        }
        else if (ans === "false") {
            user.friendSenders.pop(friendId);
            friend.friendRequests.pop(id);
            await user.save();
            await friend.save();
            return res.status(200).send({ message: "Friend request rejected", success: true });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error while adding friend", success: false, err });
    }

}

const showFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        const friends = user.friends;

        // console.log(friends);
        const stringIdArray = friends.map((objectId) => objectId.toString());

        const allusers = await userModel.find({});
        const newAllusers = allusers.map((user) => user._id.toString());
        console.log(stringIdArray, newAllusers);

        const difference =
            newAllusers.filter((element) => !stringIdArray.includes(element));


        const friendList = await userModel.find({ _id: { $in: friends } });
        const otherUsers = await userModel.find({ _id: { $in: difference } });
        // console.log(friendList);
        return res.status(200).send({ message: "Friends", success: true, friendList, otherUsers });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error while showing friend", success: false, err });
    }

}

const getFriendRequests = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        const friendRequests = user.friendSenders;
        const friendRequestList = await userModel.find({ _id: { $in: friendRequests } });
        return res.status(200).send({ message: "Friend Requests", success: true, friendRequestList })
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error while showing friend requests", success: false, err });
    }
}






router.get('/all-users', getAllUsers)//get all users

router.post('/register', RegisterC) //register a user

router.post('/login', LoginC) //login a user

router.get('/current-user/:id', getCurrentUser)

router.delete('/delete-user/:id', deleteUser)

router.post('/add-friend/:id', addFriend) //add a friend

router.post('/friend-request/:id', getFriendRequest)

router.get('/show-friends/:id', showFriends)

router.get('/requests/:id', getFriendRequests)

module.exports = router;