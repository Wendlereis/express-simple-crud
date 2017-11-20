const sequelize = require('../../config/sequelize.js')

module.exports = sequelize.define('UserModel',{
    firstName: {
        type: sequelize.Sequelize.STRING
    },
    lastName: {
        type: sequelize.Sequelize.STRING
    }
})
