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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'anio',
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
    tableName: 'materias',
    timestamps: false,
})

module.exports = Materias
