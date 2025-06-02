const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');
const { mapFinderOptions } = require('sequelize/lib/utils');

const alumPerfiles = sequelize.define('alumPerfiles', {
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
        allowNull: false,
        references: {
            model: 'anios',
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

const Asistencia = require('./asistencias.js');
alumPerfiles.hasMany(Asistencia, {
    foreignKey: 'idAlumno'
});

const Notas = require('./notas.js');
alumPerfiles.hasMany(Notas, {
    foreignKey: 'idAlumno'
});

const Anio = require('./anio.js');
alumPerfiles.belongsTo(Anio, {
    foreignKey: 'idAnio'
});

module.exports = alumPerfiles;
