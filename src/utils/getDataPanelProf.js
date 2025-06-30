const AlumPerfiles = require('../database/models/AlumPerfiles.js')
const Materias = require('../database/models/Materias.js')
const Notas = require('../database/models/Notas.js')
const Anio = require('../database/models/Anio.js')

async function getDataPanelProf(idUser) {

    let data = {
        //Apartado de notas
        nota: [],
        nombreMat: [],
        anio: [],
        curso: [],
        nombreAlum: [],
        apellidoAlum: [],

        //Apartado de materias
        cantMate: 0,
        materiaId: [],
        materiasMate: [],
        anioMate: [],
        cursoMate: [],
        turnoMate: [],
    }

    // Consultas e ingreso de datos del apartado de notas al objeto 'data'

    const dataNotas = await Notas.findAll({
        where: { idProfe: idUser },
        attributes: ['nota'],
        include: [{
            model: AlumPerfiles,
            attributes: ['nombres', 'apellidos']
        }, {
            model: Materias,
            attributes: ['nombre'],
            include: [{
                model: Anio,
                attributes: ['anio', 'cursos']
            }]
        }
        ],
    });


    for (let n = 0; n < dataNotas.length; n++) {
        data.nota.push(dataNotas[n].dataValues.nota)
        data.nombreMat.push(dataNotas[n].dataValues.Materia.dataValues.nombre)
        data.anio.push(dataNotas[n].dataValues.Materia.dataValues.Anio.dataValues.anio)
        data.curso.push(dataNotas[n].dataValues.Materia.dataValues.Anio.dataValues.cursos)
        data.nombreAlum.push(dataNotas[n].dataValues.AlumPerfile.dataValues.nombres)
        data.apellidoAlum.push(dataNotas[n].dataValues.AlumPerfile.dataValues.apellidos)
    }

    // Consultas e ingreso de datos del apartado de materias al objeto 'data'

    const dataDb = await Materias.findAndCountAll({
        attributes: ['idMateria', 'nombre'],
        where: {
            idProfe: idUser
        },
        include: [{
            attributes: ['anio', 'cursos', 'turno'],
            model: Anio,
        }]
    })


    for (let i = 0; i < dataDb.rows.length; i++) {
        data.cantMate = dataDb.count
        data.materiaId.push(dataDb.rows[i].dataValues.idMateria)
        data.materiasMate.push(dataDb.rows[i].dataValues.nombre)
        data.anioMate.push(dataDb.rows[i].dataValues.Anio.dataValues.anio)
        data.cursoMate.push(dataDb.rows[i].dataValues.Anio.dataValues.cursos)
        data.turnoMate.push(dataDb.rows[i].dataValues.Anio.dataValues.turno)
    }

    const anio = await Materias.findAll({
        where: {
            idMateria: data.materiaId[0]
        },
        include: [{
            model: Anio,
            attributes: ['anio'],
        }]
    })

    const idAnio = anio[0].dataValues.Anio.dataValues.anio

    const alumsInfo = await AlumPerfiles.findAll({
        attributes: ['nombres', 'apellidos'],
        where: {
            idAnio: idAnio
        }
    })

    for (alum of alumsInfo) {
        console.log(alum.dataValues.nombres)
        console.log(alum.dataValues.apellidos)
    }

    return data

}

module.exports = getDataPanelProf
