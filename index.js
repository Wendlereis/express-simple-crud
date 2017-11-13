require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'ejs')

const User = require("./Models/UserModel")

//GET all Users
app.get('/user', (req, res) => {
    User.findAll().then(user => {
        res.render('index', {user})
    })
})

app.get('/user/create', (req, res) => {
    res.render('create')
})

//GET user by its id
app.get('/user/:id', (req, res) => {
    let id = req.params['id']

    User.findById(id).then((user) => {
        if(user){
            res.send(user)
        }
        else {
            res.sendStatus(404) 
        }
    })
})

//POST create a new user
app.post('/user', (req, res) => {
    let body = req.body

    let newUser = {
        firstName: body['firstName'],
        lastName: body['lastName']
    }

    User.create(newUser).then((user) => {
        res.send(user)
    })
})

//PUT update a user by its id
app.put('/user/:id', (req, res) => {
    let body = req.body
    let id = req.params['id']

    let newUser = {
        firstName: body['firstName'],
        lastName: body['lastName']
    }

    User.update(newUser, {
        where: {
            id: id
        }
    }).then((count) => {
        if(count > 0){
            res.sendStatus(200)
        }
        else {
            res.sendStatus(404)
        }
    })
})

//DELETE delete a user by its id
app.delete('/user/:id', (req, res) => {
    let id = req.params['id']

    User.destroy({
        where: {
            id: id
        }
    }).then((count) => {
        if(count > 0){
            res.sendStatus(204)
        }
        else {
            res.sendStatus(404)
        }
    })
})

app.listen(3000, () => {
    console.log('App running on port 3000')
})