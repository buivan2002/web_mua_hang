const express = require ('express')
const router =  express.Router()

const searchController = require('../app/controller/searchController');

router.get('/', searchController.index)
module.exports = router;
