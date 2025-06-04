const { DataTypes } = require('sequelize');
const sequelize = require('../../config/mySql.js');

const Notas = sequelize.define('Notas', {
    idNota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProfe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'profPerfiles',
            key: 'idProfe'
        }
    },
    idAlumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'alumPerfiles',
            key: 'idAlumno'
        }
    },
    idMate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'materias',
            key: 'idMateria'
        }
    },
}, {
    tableName: 'notas',
    timestamps: false,
});


module.exports = Notas;
