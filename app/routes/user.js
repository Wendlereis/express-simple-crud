const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

//GET all users
router.get('/', userController.getAll)

//GET opens view create
router.get('/create', (req, res) => userController.getView(req, res, 'create'))

//GET opens view update
router.get('/update/:id', (req, res) => userController.getUserView(req, res, 'update'))

//GET opens view update
router.get('/delete/:id', (req, res) => userController.getUserView(req, res, 'delete'))

//POST update a user by its id
router.post('/update/:id', userController.updateUser)

//POST delete a user by its id
router.post('/delete/:id', userController.deleteUser)

//POST create a new user
router.post('/', userController.createUser)

module.exports = router
