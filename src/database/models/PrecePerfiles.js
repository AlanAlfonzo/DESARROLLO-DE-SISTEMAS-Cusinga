const sequelize = require('../../config/mySql.js')
const { DataTypes } = require('sequelize')

const PrecePerfiles = sequelize.define('PrecePerfiles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'prece_perfiles',
    timestamps: false
})

module.exports = PrecePerfiles
