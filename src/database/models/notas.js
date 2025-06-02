const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');

const Notas = sequelize.define('Notas', {
    idNota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idAlu: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'notas',
    timestamps: false,
    underscored: true
});


module.exports = Notas;
