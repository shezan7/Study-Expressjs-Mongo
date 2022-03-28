const express = require('express')
const router = express.Router()

const passport = require("passport")

const checkAuth = require('../middleware/check-auth');
const { checkUser } = require("./../middleware/roleValid")

const googleAuthController = require('../controllers/users');


router.get('/', (req, res) => res.send('You are not logged in'))
router.get('/failed', (req, res) => res.send('Failed to log in!!!'))
router.get('/good', (req, res) => res.send(`Welcome ${req.user.name.givenName}`))

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        console.log(req.user)
        // Successful authentication, redirect home.
        res.redirect('/googleAuth/good');
    });

router.get('/logout', (req, res) => {
    req.session = null
    req.logOut()
    res.redirect('/')
})



module.exports = router;