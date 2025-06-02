const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');
const { mapFinderOptions } = require('sequelize/lib/utils');

const alumPerfiles = sequelize.define('alumPerfiles', {
    idAlumno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    idAnio: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    tableName: 'alumPerfiles',
    timestamps: true,
    underscored: true
},)

module.exports = alumPerfiles;
