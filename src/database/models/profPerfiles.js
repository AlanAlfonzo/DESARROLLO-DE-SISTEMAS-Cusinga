const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');
const { mapFinderOptions } = require('sequelize/lib/utils');

const profPerfiles = sequelize.define('profPerfiles', {
    idProfe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
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
    }
}, {
    tableName: 'profPerfiles',
    timestamps: true,
    underscored: true
});

module.exports = profPerfiles;
