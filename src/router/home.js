const express = require ('express')
const router =  express.Router()

const homeController = require('../app/controller/homeController');

router.get('/', homeController.index)
module.exports = router;
