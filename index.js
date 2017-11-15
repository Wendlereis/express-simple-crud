require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.static('public'))

app.set('view engine', 'ejs')

const User = require("./models/UserModel")

//GET all Users
app.get('/', (req, res) => {
    User.findAll().then(users => {
        res.render('index', {users})
    })
})

//GET opens view create 
app.get('/create', (req, res) => {
    res.render('create')
})

//GET opens view update
app.get('/update/:id', (req, res) => {
    let id = req.params['id']
    
    User.findById(id).then((user) => {
        if(user){
            res.render('update', {user})
        }
        else {
            res.sendStatus(404) 
        }
    })    
})

//GET opens view update
app.get('/delete/:id', (req, res) => {
    let id = req.params['id']
    
    User.findById(id).then((user) => {
        if(user){
            res.render('delete', {user})
        }
        else {
            res.sendStatus(404) 
        }
    })    
})

//GET user by its id
app.get('/:id', (req, res) => {
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
app.post('/', (req, res) => {
    let body = req.body

    console.log(body)

    let newUser = {
        firstName: body['firstName'],
        lastName: body['lastName']
    }

    User.create(newUser).then((user) => {
        res.send(user)
    })
})

//PUT update a user by its id
app.put('/:id', (req, res) => {
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
app.delete('/:id', (req, res) => {
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