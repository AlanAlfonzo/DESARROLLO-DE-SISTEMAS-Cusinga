const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sequelizeHosco', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = sequelize
