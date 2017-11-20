const User = require('../../app/models/user')

exports.getAll = (req, res) => {
    User.findAll({
        order: ['id']
    }).then(users => {
        res.render('../app/views/index', {users})
    })
}

exports.getUserView = (req, res, view) => {
    let id = req.params['id']

    User.findById(id).then((user) => {
        if(user){
            res.render(`../app/views/${view}`, {user})
        }
        else {
            res.sendStatus(404)
        }
    })
}

exports.getView = (req, res, view) => {
    res.render(`../app/views/${view}`)
}

exports.updateUser = (req, res) => {
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
}

exports.deleteUser = (req, res) => {
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
}

exports.createUser = (req, res) => {
    let body = req.body

    let newUser = {
        firstName: body['firstName'],
        lastName: body['lastName']
    }

    User.create(newUser).then(() => {
        res.redirect('/')
    })
}
