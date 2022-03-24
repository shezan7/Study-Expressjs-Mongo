const fs = require('fs')
const express = require('express')
const router = express.Router()

const ProductsController = require('../controllers/products')

const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dkbtyznkd',
    api_key: '459563487576644',
    api_secret: '2e8QcuVAm9wJ3N31EkCxKGntoAQ'
});

const checkAuth = require('../middleware/check-auth')
const { checkUser } = require("./../middleware/roleValid")



router.use(checkAuth);

router.get("/", checkUser(1), ProductsController.products_get_all);

router.get("/:id", checkUser(1), ProductsController.products_get_product_id);

router.post("/", checkUser(2), ProductsController.products_create);
// router.post("/", authAdmin(1), ProductsController.products_create);

// router.post("/pic", checkAuth, ProductsController.products_create_with_photo);

router.patch("/", checkUser(3), ProductsController.products_update);

router.delete("/", checkUser(4), ProductsController.products_delete);


module.exports = router;