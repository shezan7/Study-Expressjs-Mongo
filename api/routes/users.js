const express = require('express')
const router = express.Router()

const passport = require("passport")

const checkAuth = require('../middleware/check-auth');
const { checkUser } = require("./../middleware/roleValid")

const UsersController = require('../controllers/users');


router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

router.patch("/make-admin", checkAuth, checkUser(13), UsersController.make_admin);

router.delete("/", checkAuth, checkUser(14), UsersController.users_delete);


module.exports = router;