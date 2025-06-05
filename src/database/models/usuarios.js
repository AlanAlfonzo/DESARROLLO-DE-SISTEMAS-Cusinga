const sequelize = require('../../config/mySql.js');
const { DataTypes } = require('sequelize');

function validatePassword(password) {
    const minLength = 6
    const maxLength = 22
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSpecialChar = /[@$!%*?&]/.test(password)

    if (password.length < minLength || password.length > maxLength) {
        throw new Error('La contraseña debe tener entre 6 y 16 caracteres.')
    }
    if (!hasUpperCase) {
        throw new Error('La contraseña debe contener al menos una letra mayúscula.')
    }
    if (!hasLowerCase) {
        throw new Error('La contraseña debe contener al menos una letra minúscula.')
    }
    if (!hasDigit) {
        throw new Error('La contraseña debe contener al menos un número.')
    }
    if (!hasSpecialChar) {
        throw new Error('La contraseña debe contener al menos un carácter especial.')
    }
}

function validateString(username) {

    const minLength = 5;
    const maxLength = 22;
    const hasSpecialChar = /[@$!%*?&]/.test(username);

    if (password.length < minLength || password.length > maxLength) {
        throw new Error('La contraseña debe tener entre 6 y 16 caracteres.');
    }

    if (!hasSpecialChar) {
        throw new Error('La contraseña debe contener al menos un carácter especial.');
    }
}

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
            model: 'Roles',
            key: 'idRol'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

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
    },
    validacion: {
        type: DataTypes.ENUM('pendiente', 'validado', 'rechazado'),
        defaultValue: 'pendiente',
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
});

module.exports = Usuarios;
