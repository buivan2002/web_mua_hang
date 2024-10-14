const express = require ('express')
const   router =  express.Router()

const add_to_cartController = require('../app/controller/add_to_cart');

router.get('/', add_to_cartController.show)
router.post('/update-quantity', add_to_cartController.upQuantity)
router.post('/', add_to_cartController.index)
router.delete('/:Product_ID', add_to_cartController.delete)
module.exports = router;
