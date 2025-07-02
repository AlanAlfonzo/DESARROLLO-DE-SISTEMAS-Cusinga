const Asistencias = require('../database/models/Asistencias.js')
const Anio = require('../database/models/Anio.js')

async function getCursosFilter(anio){

    let data = {
        cursos: []
    }

    let cursosData = await Anio.findAll({
        where: {
            anio: anio
        },
        attributes: ['cursos']
    })

    for( let i = 0; i < cursosData.length; i++){
        data.cursos.push(cursosData[i].dataValues.cursos)
    }

    return data

}
