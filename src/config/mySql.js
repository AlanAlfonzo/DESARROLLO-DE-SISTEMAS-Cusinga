const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sequelizeHosco', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
})

module.exports = sequelize
