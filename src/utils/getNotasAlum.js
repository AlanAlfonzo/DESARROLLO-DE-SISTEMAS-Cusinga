const { Notas, profPerfiles, Materias } = require('../database/models/relaciones.js')
const { Op } = require('sequelize');

async function getNotasAlum(idUser) {
    
    let data = {
        notas: null,
        totalAprobados: (await Notas.findAndCountAll({where: {idAlumno: idUser, nota: { [Op.gte]: 6}}})).count,
        totalDesaprobados: (await Notas.findAndCountAll({where: {idAlumno: idUser, nota: { [Op.lt]: 6}}})).count,
        nameMate: [],
        numNota: [],
        docente: []
    }

    const dataNotas = [await Notas.findAll({
        attributes: ['nota'],
        where: {
            idAlumno: idUser
        },
        include: [{
            model: Materias,
            attributes: ['nombre']
        }],
    }),
        await Notas.findAll({
        where: {
            idAlumno: idUser
        },
        include: [{
            model: profPerfiles,
            attributes: ['nombres']
        }]
    })]

    for( let i = 0; i < dataNotas[0].length; i++){
        data.nameMate.push(dataNotas[0][i].dataValues.Materia.dataValues.nombre)
        data.docente.push(dataNotas[1][i].dataValues.ProfPerfile.dataValues.nombres)
        data.numNota.push(dataNotas[0][i].dataValues.nota)

    }

    if (data.totalAprobados){
        data.notas = true
    }
    
    return data
}

module.exports = getNotasAlum
