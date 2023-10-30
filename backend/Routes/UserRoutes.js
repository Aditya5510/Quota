const express = require('express')
const userModel = require('../Models/userModel.js')
const bcrypt = require('bcrypt')



//Controllers
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
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
        const { username, email, password,Profile } = req.body
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


        const user = new userModel({ username, email, password: hashed_password,Profile })
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
try{
    const {id} = req.params
    const user=await userModel.findOne({id})
    if (!user) {
        return res.status(200).send({ message: "user not regisred", success: false })
    }
    return res.status(200).send({  success: true, user })

}
catch (error){
    console.log(error)
    return res.status(500).send({ message: "Server Error", success: false, error })
}
}




const router = express.Router()

router.get('/all-users', getAllUsers)//get all users

router.post('/register', RegisterC) //register a user

router.post('/login', LoginC) //login a user

router.get('current-user/:id', getCurrentUser)

module.exports = router;