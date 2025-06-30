const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');

const ProfPerfiles = sequelize.define('ProfPerfiles', {
    idProfe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    tableName: 'profPerfiles',
    timestamps: true,
});

module.exports = ProfPerfiles;
