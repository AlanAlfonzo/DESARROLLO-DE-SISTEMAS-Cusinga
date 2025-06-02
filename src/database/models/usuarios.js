const { validateString } = require('../../utils/validationString.js');
const sequelize = require('../../config/mySql.js');
const { DataTypes } = require('sequelize');
const { validatePassword } = require('../../utils/validationPassword.js');

const Usuarios = sequelize.define('Usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'idRol'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            customValidator(value) {
                validateString(value);
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            customValidator(value) {
                validatePassword(value);
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isMail: true
        }
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

const Roles = require('./roles.js');
Usuarios.belongsTo(Roles, {
    foreignKey: 'idRole'
});

const profPerfiles = require('./profPerfiles.js');
Usuarios.hasOne(profPerfiles, {
    foreignKey: 'idProfe'
});

const alumPerfiles = require('./alumPerfiles.js');
Usuarios.hasOne(alumPerfiles, {
    foreignKey: 'idAlumno'
});

module.exports = Usuarios;
