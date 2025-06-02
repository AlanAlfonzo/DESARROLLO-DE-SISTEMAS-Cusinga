const { DataTypes } = require('sequelize')
const sequelize = require('../../config/mySql.js')

const Roles = sequelize.define('Roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'roles',
    timestamps: false,
    underscored: true
})

Roles.belongTo

module.exports = Roles
