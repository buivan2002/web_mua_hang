const express = require ('express')
const router =  express.Router()

const auth = require('../app/controller/auth');

router.get('/signup',auth.signup)
router.get('/logout',auth.logout)
router.get('/',auth.login)
router.post('/signup',auth.signup_post)
router.post('/',auth.login_post)    


module.exports = router;    
