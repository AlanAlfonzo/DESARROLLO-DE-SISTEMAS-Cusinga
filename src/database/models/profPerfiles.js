const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');

const profPerfiles = sequelize.define('profPerfiles', {
    idProfe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
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

const Materias = require('./materias.js');
profPerfiles.hasMany(Materias, {
    foreignKey: 'idProfe'
});

const Asistencia = require('./asistencias.js');
profPerfiles.hasMany(Asistencia, {
    foreignKey: 'idProfe'
});

const Notas = require('./notas.js');
profPerfiles.hasMany(Notas, {
    foreignKey: 'idProfe'
});

module.exports = profPerfiles;
