const express = require ('express')
const router =  express.Router()

const productController = require('../app/controller/productController');

router.get('/', productController.index)
module.exports = router;
