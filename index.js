/*
    -------------------------------------------------------------------------
    --      EXPRESS AREA
    -------------------------------------------------------------------------
*/

//UsingExpress
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

/*
    -------------------------------------------------------------------------
    --      SEQUELIZE AREA
    -------------------------------------------------------------------------
*/

//Using Sequelize (ORM for Postgress)
const Sequelize = require('sequelize')

const host = ''
const database = ''
const username = ''
const password = ''

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

//Testing database connection
sequelize.authenticate().then(() => {
    console.log('Database connection OK')
}).catch(err => {
    console.log('Unable to connect to the database')
})

//Create UserModel
const User = sequelize.define('UserModel',{
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
})

User.sync().then(() => {
    console.log('database running')
})

/*
    -------------------------------------------------------------------------
    --      EXPRESS ROUTES AREA
    -------------------------------------------------------------------------
*/

//GET all Users
app.get('/user', (req, res) => {
    User.findAll().then(user => {
        res.send(user)
    })
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