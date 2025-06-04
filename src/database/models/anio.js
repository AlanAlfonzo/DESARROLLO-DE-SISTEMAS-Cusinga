const sequelize = require('../../config/mySql.js');
const { DataTypes } = require('sequelize');

const Anio = sequelize.define('Anio', {
    idAnio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    cursos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    turno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    especialidad: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'anio',
    timestamps: false,
})

module.exports = Anio;
