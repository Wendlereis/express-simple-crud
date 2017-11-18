const express = require('express')
const router = express.Router()

const User = require("../../app/models/user")

//GET all Users
router.get('/', (req, res) => {
    User.findAll({
        order: ['id']
    }).then(users => {
        res.render('../app/views/index', {users})
    })
})

//GET opens view create 
router.get('/create', (req, res) => {
    res.render('../app/views/create')
})

//GET opens view update
router.get('/update/:id', (req, res) => {
    let id = req.params['id']
    
    User.findById(id).then((user) => {
        if(user){
            res.render('../app/views/update', {user})
        }
        else {
            res.sendStatus(404) 
        }
    })    
})

//GET opens view update
router.get('/delete/:id', (req, res) => {
    let id = req.params['id']
    
    User.findById(id).then((user) => {
        if(user){
            res.render('../app/views/delete', {user})
        }
        else {
            res.sendStatus(404) 
        }
    })    
})

//POST update a user by its id
router.post('/update/:id', (req, res) => {
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
            res.redirect('/')
        }
        else {
            res.sendStatus(404)
        }
    })
})

//POST delete a user by its id
router.post('/delete/:id', (req, res) => {
    let id = req.params['id']

    User.destroy({
        where: {
            id: id
        }
    }).then((count) => {
        if(count > 0){
            res.redirect('/')
        }
        else {
            res.sendStatus(404)
        }
    })
})

//POST create a new user
router.post('/', (req, res) => {
    let body = req.body

    let newUser = {
        firstName: body['firstName'],
        lastName: body['lastName']
    }

    User.create(newUser).then((user) => {
        res.redirect('/')
    })
})

module.exports = router