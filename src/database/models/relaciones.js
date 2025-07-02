const PrecePerfiles = require('./PrecePerfiles.js')
const ProfPerfiles = require('./ProfPerfiles.js')
const AlumPerfiles = require('./AlumPerfiles.js')
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
Usuarios.hasOne(ProfPerfiles, {
    foreignKey: 'idProfe'
})
Usuarios.hasOne(AlumPerfiles, {
    foreignKey: 'idAlumno'
})
Usuarios.hasOne(PrecePerfiles,{
    foreignKey: 'idPrece'
})

AlumPerfiles.hasMany(Asistencia, {
    foreignKey: 'idAlumno'
})

AlumPerfiles.hasMany(Notas, {
    foreignKey: 'idAlumno'
})
AlumPerfiles.belongsTo(Anio, {
    foreignKey: 'idAnio'
})

PrecePerfiles.hasMany(Asistencia, {
    foreignKey: 'idPrece'
})
PrecePerfiles.belongsTo(Usuarios, {
    foreignKey: 'idPrece'
})

ProfPerfiles.belongsTo(Usuarios, {
    foreignKey: 'idProfe'
})
ProfPerfiles.hasMany(Materias, {
    foreignKey: 'idProfe'
})
ProfPerfiles.hasMany(Notas, {
    foreignKey: 'idProfe'
})

Notas.belongsTo(ProfPerfiles, {
    foreignKey: 'idProfe'
})
Notas.belongsTo(AlumPerfiles, {
    foreignKey: 'idAlumno',
})
Notas.belongsTo(ProfPerfiles, {
    foreignKey: 'idProfe'
})
Notas.belongsTo(Materias, {
    foreignKey: 'idMateria'
})

Materias.hasMany(Notas, {
    foreignKey: 'idMateria'
})
Materias.belongsTo(Anio, {
    foreignKey: 'idAnio'
})
Materias.belongsTo(ProfPerfiles, {
    foreignKey: 'idProfe'
})

Anio.hasMany(AlumPerfiles, {
    foreignKey: 'idAnio'
})
Anio.hasMany(Materias, {
    foreignKey: 'idAnio'
})

module.exports = { ProfPerfiles, PrecePerfiles, AlumPerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio }
