const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');

const alumPerfiles = sequelize.define('AlumPerfiles', {
    idAlumno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'idUsuario'
        }
    },
    idAnio: {
        type: DataTypes.INTEGER,
        references: {
            model: 'anio',
            key: 'idAnio'
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
},{
    tableName: 'alumPerfiles',
    timestamps: true,
},)

module.exports = alumPerfiles;
