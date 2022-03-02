const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')
 
mongoose.connect('mongodb+srv://shezan7:' + process.env.MONGO_ATLAS_PW + '@cluster0.ic9ur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
//' + process.env.MONGO_ATLAS_PW + '

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!!!'
//     })
// })


// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
  }));

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

// app.use((req, res, next) => {
//     const error = new Error('Not Found!!!')
//     error.status = 404
//     next(error)
// })

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app