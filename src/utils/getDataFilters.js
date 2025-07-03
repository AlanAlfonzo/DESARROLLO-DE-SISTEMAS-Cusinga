const AlumPerfiles = require('../database/models/AlumPerfiles.js')
const Asistencias = require('../database/models/Asistencias.js')
const Anio = require('../database/models/Anio.js')

async function getCursos(anio) {

    let data = {
        cursos: []
    }

    let cursosData = await Anio.findAll({
        where: {
            anio: anio
        },
        attributes: ['cursos']
    })

    for (let i = 0; i < cursosData.length; i++) {
        data.cursos.push(cursosData[i].dataValues.cursos)
    }

    return data

}

async function getAlumnosNames(idUser) {

    let data = {
        nombres: [],
        apellidos: []
    }

    let alumnosData = await AlumPerfiles.findAll({
        attributes: ['nombres', 'apellidos'],
        where: {
            idAlumno: idUser
        }
    })

    for (let i = 0; i < alumnosData.length; i++) {
        data.nombres.push(alumnosData[i].dataValues.nombres)
        data.apellidos.push(alumnosData[i].dataValues.apellidos)
    }

}

module.exports = { getCursos, getAlumnosNames }
