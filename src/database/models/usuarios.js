const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');

const Usuarios = sequelize.define('Usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idRole: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    validacion: {
        type: DataTypes.ENUM(['pendiente', 'validado', 'rechazado']),
        allowNull: false,
        defaultValue: 'pendiente'
    },
    lastUpdated: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'usuarios',
    timestamps: false,
    underscored: true
});

module.exports = Usuarios;
