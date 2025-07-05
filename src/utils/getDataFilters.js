const AlumPerfiles = require('../database/models/AlumPerfiles.js')
const Asistencias = require('../database/models/Asistencias.js')
const Anio = require('../database/models/Anio.js')

async function getCursos(anio) {

    let data = {
        idAnio: [],
        cursos: []
    }

    let cursosData = await Anio.findAll({
        where: {
            anio: anio
        },
        attributes: ['idAnio', 'cursos']
    })

    for (let i = 0; i < cursosData.length; i++) {
        data.idAnio.push(cursosData[i].dataValues.idAnio)
        data.cursos.push((cursosData[i].dataValues.cursos+'º'))
    }

    return data

}

async function getAlumnosNames(idAnio) {

    let data = {
        idAlumnos: [],
        nombres: [],
        apellidos: []
    }

    let alumnosData = await AlumPerfiles.findAll({
        attributes: ['nombres', 'apellidos', 'idAlumno'],
        where: {
            idAnio: idAnio
        }
    })

    for (let i = 0; i < alumnosData.length; i++) {
        data.idAlumnos.push(alumnosData[i].dataValues.idAlumno)
        data.nombres.push(alumnosData[i].dataValues.nombres)
        data.apellidos.push(alumnosData[i].dataValues.apellidos)
    }

    return data

}

module.exports = { getCursos, getAlumnosNames }
