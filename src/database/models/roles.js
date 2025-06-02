const { DataTypes } = require('sequelize')
const sequelize = require('../../config/mySql.js')

const Roles = sequelize.define('Roles', {
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'roles',
    timestamps: false,
    underscored: true
})

const Usuarios = require('./usuarios.js') 
Roles.hasOne(Users, { // se crea la relacion de roles con usuarios
    foreignKey: 'idRol'
})

module.exports = Roles
