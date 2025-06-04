const { validatePassword } = require('../utils/validationPassword.js');
const { validateString } = require('../utils/validationString.js');
const sequelize = require('../../config/mySql.js');
const { DataTypes } = require('sequelize');

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
        type: DataTypes.ENUM('pendiente', 'validado', 'rechazado'),
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
});
//CREATE TABLE IF NOT EXISTS `usuarios` (`id_usuario` INTEGER auto_increment , `id_rol` INTEGER NOT NULL, `username` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL UNIQUE, `validacion` ENUM('pendiente', 'validado', 'rechazado') NOT NULL DEFAULT 'pendiente', `last_updated` DATETIME, PRIMARY KEY (`id_usuario`), FOREIGN KEY (`id_rol`) REFERENCES `Roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

module.exports = Usuarios;
