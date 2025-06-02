const sequelize = require('../../config/mySql.js');
const { DataTypes } = require('sequelize');

const Asistencia = sequelize.define('Asistencia', {
    idAlumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProfe: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
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
    underscored: true
});

module.exports = Asistencia;
