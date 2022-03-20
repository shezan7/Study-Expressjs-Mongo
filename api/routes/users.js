const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth');
const { authAdmin } = require("./../middleware/roleValid")

const UsersController = require('../controllers/users');


router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

router.patch("/make-admin", authAdmin("admin"), checkAuth, UsersController.make_admin);

router.delete("/", authAdmin("admin"), checkAuth, UsersController.users_delete);


module.exports = router;