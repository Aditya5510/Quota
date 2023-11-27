const express = require('express')
const cors = require('cors')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/conmectDB.js')
const socket = require("socket.io");

// Load env vars
dotenv.config()
const UserRoutes = require('./Routes/UserRoutes.js')
const BlogRoutes = require('./Routes/BlogRoutes.js')
const ChatRoutes = require('./Routes/chatRoutes.js')


const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/api/v1/user/', UserRoutes)
app.use('/api/v1/blog/', BlogRoutes)
app.use('/api/v1/chat/', ChatRoutes)




const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => { console.log(`Server is running on port     ${PORT}`.yellow.bold) })

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});


global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        // console.log(onlineUsers);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(data);

        if (sendUserSocket) {
            console.log(data);
            socket.to(sendUserSocket).emit("msg-recieve", data);

        }
    });
});