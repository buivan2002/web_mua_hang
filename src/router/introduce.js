const express = require ('express')
const router =  express.Router()

const introduceController = require('../app/controller/introduceController');

router.get('/', introduceController.index)
module.exports = router;
