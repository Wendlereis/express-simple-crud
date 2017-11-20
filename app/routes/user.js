const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

//GET all users
router.get('/', userController.getAll)

//GET opens view create 
router.get('/create', userController.getCreateView)

//GET opens view update
router.get('/update/:id', userController.getUpdateView)

//GET opens view update
router.get('/delete/:id', userController.getDeleteView)

//POST update a user by its id
router.post('/update/:id', userController.updateUser)

//POST delete a user by its id
router.post('/delete/:id', userController.deleteUser)

//POST create a new user
router.post('/', userController.createUser)

module.exports = router
