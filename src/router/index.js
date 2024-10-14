const home = require ('../router/home')
const product = require ('../router/product')
const search = require ('../router/search')
const introduce = require ('../router/introduce')
const login = require ('../router/login')
const add_to_cart = require ('../router/add_to_cart')
function route (app){
    app.use('/product',product)
    app.use('/introduce',introduce)
    app.use('/search',search)
    app.use('/add_to_cart',add_to_cart)
    app.use('/login',login)
    app.use('/',home)

}


  
module.exports = route