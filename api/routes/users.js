const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth');
const { checkUser } = require("./../middleware/roleValid")

const UsersController = require('../controllers/users');


router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

router.patch("/make-admin", checkUser("admin"), checkAuth, UsersController.make_admin);

router.delete("/", checkUser("admin"), checkAuth, UsersController.users_delete);


module.exports = router;