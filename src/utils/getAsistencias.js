const Asistencias = require('../database/models/Asistencias.js')

async function getAsistencias(idUser) {
    
    let data = {
        fecha: [],
        puntualidad: [],
    }

    // Consultas e ingreso de datos del apartado de Asistencias al objeto 'data'

    let asistencias = await Asistencias.findAndCountAll({
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

}
