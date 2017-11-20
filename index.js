/* eslint-disable no-console */

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const user = require('./app/routes/user')

const app = express()

//Request parsers
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//User route
app.use('/', user)

//Static import for .css, .js and img files
app.use(express.static('public'))

//Settig EJS view engine
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('App running on port 3000')
})
