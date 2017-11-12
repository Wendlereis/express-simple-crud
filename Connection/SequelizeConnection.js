//Using Sequelize (ORM for Postgress)
const Sequelize = require('sequelize')

const host = ''
const database = ''
const username = ''
const password = ''

module.exports = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})