const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const bcrypt = require ("bcrypt")
const methodOverride = require('method-override')
const cors = require('cors');
const cookieParser = require('cookie-parser')

const { engine } = require("express-handlebars");
const port = 3000
const { connection } = require('./config/db');
const {urlencoded} = require('body-parser'); //xem cai nay la cai gi 


const route = require('./router/index')


app.engine("handlebars", engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(morgan('combined'));
app.use(cookieParser())
app.use(urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'src/resources/public')))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(cors())

route(app)

module.exports = app
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
