const express = require('express');
const pageRouter = require('./router/pageRouter');
const app = express()
const mongoose = require('mongoose');
const photoRouter = require('./router/photoRouter')
const userRouter = require('./router/userRouter')
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2
const methodOverride = require('method-override');
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


mongoose.connect(process.env.API_KEY)
    .then(() => {
        console.log("mongoDB is connected")
    })
    .catch((err) => {
        console.log(err)
    })
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true }))
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
})
)


app.set('view engine', 'ejs')

app.use('*', checkUser)
app.use('/', pageRouter)
app.use('/photos', photoRouter)
app.use('/users', userRouter)

app.listen(3000, () => {
    console.log("server başarıyla çalıştı")
})