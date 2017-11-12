//Using Sequelize (ORM for Postgress)
const Sequelize = require('sequelize')

const host = process.env.HOST
const database = process.env.DB
const username = process.env.USR
const password = process.env.PASS

module.exports = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})