const { DataTypes } = require('sequelize')
const sequelize = require('../../config/mySql.js')

const Materias = sequelize.define('Materias', {
    idMate: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProfe: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    anio: {
        type: DataTypes.enum,
        allowNull: false
    },
    curso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {})

module.exports = Materias
