const express = require('express')
const cors = require('cors')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/conmectDB.js')


// Load env vars
dotenv.config()
const UserRoutes = require('./Routes/UserRoutes.js')
const BlogRoutes = require('./Routes/BlogRoutes.js')


const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/api/v1/user/', UserRoutes)
app.use('/api/v1/blog/', BlogRoutes)




const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`Server is running on port     ${PORT}`.yellow.bold) })