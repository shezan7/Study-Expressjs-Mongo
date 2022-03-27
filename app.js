const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const passport = require('passport')
const cookieSession = require('cookie-session')
require('./api/middleware/passport-setup')


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')

app.use(express.json())

app.use(fileUpload({
    useTempFiles: true,
}));

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)



app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401)
    }
}

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => res.send('You are not logged in'))
app.get('/failed', (req, res) => res.send('Failed to log in!!!'))
app.get('/good', (req, res) => res.send('Welcome ${req.user.email}'))

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });

app.get('/logout', (req, res) => {
    req.session = null
    req.logOut()
    res.redirect('/')
})


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