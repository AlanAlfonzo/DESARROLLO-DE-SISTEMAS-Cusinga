const { DataTypes } = require('sequelize')
const sequelize = require('../../config/mySql.js')

const Roles = sequelize.define('Roles', {
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Roles',
    timestamps: false,
})

module.exports = Roles
