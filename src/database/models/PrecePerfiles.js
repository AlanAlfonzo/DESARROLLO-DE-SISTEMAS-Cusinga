const sequelize = require('../../config/mySql.js')
const { DataTypes } = require('sequelize')

const PrecePerfiles = sequelize.define('PrecePerfiles', {
    idPrece: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'idRol'
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'precePerfiles',
    timestamps: false
})

module.exports = PrecePerfiles
