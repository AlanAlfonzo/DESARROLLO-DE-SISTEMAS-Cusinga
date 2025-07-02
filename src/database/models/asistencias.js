const sequelize = require('../../config/mySql.js');
const { DataTypes } = require('sequelize');

const Asistencia = sequelize.define('Asistencia', {
    idAsis: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idAlumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'alumPerfiles',
            key: 'idAlumno'
        }
    },
    idPrece: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'precePerfiles',
            key: 'idPrece'
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    puntualidad: {
        type: DataTypes.ENUM([
            'Presente',
            'Tarde',
            'Ausente'
        ]),
        allowNull: false
    },
}, {
    tableName: 'asistencias',
    timestamps: false,
})

module.exports = Asistencia;
