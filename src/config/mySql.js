const { sequelize, Sequelize } = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost:3306/mi_basedatos', {
    dialect: 'mysql',
    logging: true
})

module.exports = sequelize
