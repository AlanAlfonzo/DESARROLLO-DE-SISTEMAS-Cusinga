const sequelize = require('../../config/mySql.js')
const { DataTypes } = require('sequelize')

const PrecePerfiles = sequelize.define('precePerfiles', {
    idPrece: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'idUsuario'
        }
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
}, {
    tableName: 'precePerfiles',
    timestamps: false
})

module.exports = PrecePerfiles
