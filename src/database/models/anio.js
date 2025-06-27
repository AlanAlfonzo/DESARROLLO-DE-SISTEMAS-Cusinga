const sequelize = require('../../config/mySql.js');
const { DataTypes } = require('sequelize');

const Anio = sequelize.define('Anio', {
    idAnio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    anio:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cursos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    turno: {
        type: DataTypes.ENUM(['maniana', 'tarde', 'noche']),
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING,
        defaultValue: 'Ninguna'
    }
}, {
    tableName: 'anio',
    timestamps: false,
})

module.exports = Anio;
