const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.nameDB, process.env.userDB, process.env.passwordDB, {
    host: process.env.hostDB,
    dialect: 'mysql',
    logging: false,
    timezone: '-03:00'
})

module.exports = sequelize
