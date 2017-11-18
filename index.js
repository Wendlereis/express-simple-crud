require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const user = require('./app/routes/user')

const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.static('public'))

app.use('/', user)

app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('App running on port 3000')
})