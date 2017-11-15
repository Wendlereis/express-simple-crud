const sequelize = require('../connection/SequelizeConnection')

module.exports = sequelize.define('UserModel',{
    firstName: {
        type: sequelize.Sequelize.STRING
    },
    lastName: {
        type: sequelize.Sequelize.STRING
    }
})