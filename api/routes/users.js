const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');


router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

router.patch("/make-admin", checkAuth, UsersController.make_admin);

router.delete("/", checkAuth, UsersController.users_delete);


module.exports = router;