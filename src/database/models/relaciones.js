const precePerfiles = require('./PrecePerfiles.js')
const profPerfiles = require('./ProfPerfiles.js')
const alumPerfiles = require('./alumPerfiles.js')
const Asistencia = require('./Asistencias.js')
const Usuarios = require('./Usuarios.js')
const Materias = require('./Materias.js')
const Notas = require('./Notas.js')
const Roles = require('./Roles.js')
const Anio = require('./Anio.js')

Roles.hasMany(Usuarios, {
    foreignKey: 'idRol'
})

Usuarios.belongsTo(Roles, {
    foreignKey: 'idRol'
})
Usuarios.hasOne(profPerfiles, {
    foreignKey: 'idProfe'
})
Usuarios.hasOne(alumPerfiles, {
    foreignKey: 'idAlumno'
})

alumPerfiles.hasMany(Asistencia, {
    foreignKey: 'idAlumno'
})

alumPerfiles.hasMany(Notas, {
    foreignKey: 'idAlumno'
})
alumPerfiles.belongsTo(Anio, {
    foreignKey: 'idAnio'
})

precePerfiles.hasMany(Asistencia, {
    foreignKey: 'idPrece'
})
precePerfiles.belongsTo(Usuarios, {
    foreignKey: 'idPrece'
})

profPerfiles.belongsTo(Usuarios, {
    foreignKey: 'idProfe'
})
profPerfiles.hasMany(Materias, {
    foreignKey: 'idProfe'
})
profPerfiles.hasMany(Notas, {
    foreignKey: 'idProfe'
})

Notas.belongsTo(profPerfiles, {
    foreignKey: 'idProfe'
})
Notas.belongsTo(alumPerfiles, {
    foreignKey: 'idAlumno'
})
Notas.belongsTo(profPerfiles, {
    foreignKey: 'idProfe'
})

Materias.hasMany(Notas, {
    foreignKey: 'idMateria'
})
Materias.belongsTo(Anio, {
    foreignKey: 'idAnio'
})
Materias.belongsTo(profPerfiles, {
    foreignKey: 'idProfe'
})

Anio.hasMany(alumPerfiles, {
    foreignKey: 'idAnio'
})
Anio.hasMany(Materias, {
    foreignKey: 'idAnio'
})

module.exports = { profPerfiles, alumPerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio }
