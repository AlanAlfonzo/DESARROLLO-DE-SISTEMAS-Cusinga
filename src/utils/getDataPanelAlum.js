const Asistencia = require('../database/models/Asistencias.js')
const ProfPerfiles = require('../database/models/ProfPerfiles.js')
const Materias = require('../database/models/Materias.js')
const Notas = require('../database/models/Notas.js')
const { Op } = require('sequelize');

async function getDataPanelAlum(idUser) {

    let data = {
        //Apartado de datos de las Asistencias
        info: true,
        asistencias: (await Asistencia.findAndCountAll({ where: { idAlumno: idUser, puntualidad: 'Presente' } })).count,
        tardes: (await Asistencia.findAndCountAll({ where: { idAlumno: idUser, puntualidad: 'Tarde' } })).count,
        ausentes: (await Asistencia.findAndCountAll({ where: { idAlumno: idUser, puntualidad: 'Ausente' } })).count,
        fecha: [],
        puntualidad: [],

        //Apartado de datos de las Notas
        notas: null,
        totalAprobados: (await Notas.findAndCountAll({ where: { idAlumno: idUser, nota: { [Op.gte]: 6 } } })).count,
        totalDesaprobados: (await Notas.findAndCountAll({ where: { idAlumno: idUser, nota: { [Op.lt]: 6 } } })).count,
        nameMate: [],
        numNota: [],
        docente: []

    }


    // Consultas e ingreso de datos del apartado de Asistencias al objeto 'data'

    let asistencias = await Asistencia.findAndCountAll({
        attributes: ['fecha', 'puntualidad'],
        where: { idAlumno: idUser },
        order: [['fecha', 'DESC']]
    })

    for (let x = 0; x < asistencias.count; x++) {
        const fechaStr = asistencias.rows[x].dataValues.fecha;
        const fecha = new Date(fechaStr);

        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();

        const fechaFormateada = `${dia}/${mes}/${anio}`;

        data.fecha.push(fechaFormateada);
        data.puntualidad.push(asistencias.rows[x].dataValues.puntualidad);
    }


    // Consultas e ingreso de datos del apartado de Notas al objeto 'data'

    data.notas = (data.totalAprobados) ? true : null

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
            model: ProfPerfiles,
            attributes: ['nombres']
        }]
    })]

    for (let i = 0; i < dataNotas[0].length; i++) {
        data.nameMate.push(dataNotas[0][i].dataValues.Materia.dataValues.nombre)
        data.docente.push(dataNotas[1][i].dataValues.ProfPerfile.dataValues.nombres)
        data.numNota.push(dataNotas[0][i].dataValues.nota)

    }

    return data

}

module.exports = getDataPanelAlum
