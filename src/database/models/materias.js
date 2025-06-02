const { DataTypes } = require('sequelize')
const sequelize = require('../../config/mySql.js')

const Materias = sequelize.define('Materias', {
    idMateria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProfe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'profPerfiles',
            key: 'idProfe'
        }
    },
    idAnio: { 
        type: DataTypes.enum(['1', '2', '3', '4', '5', '6']),
        allowNull: false,
        references: {
            model: 'anios',
            key: 'idAnio'
        }
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
}, {

})

module.exports = Materias
