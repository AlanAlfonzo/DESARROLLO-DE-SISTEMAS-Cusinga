const sequelize = require('../../config/mySql.js');
const { DataTypes } = requerie('sequelize');

const Anio = sequelize.define('Anio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    cursos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: truea
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
    underscored: true
})


module.exports = Anio;
