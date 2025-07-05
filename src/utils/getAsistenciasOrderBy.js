const {Asistencia} = require('../database/models/Asistencias.js')

/**
 * @param {List[]} parametros
 * ```js
 * getAsistenciasOrderBy([idUser,'DESC', '1'])
 * ```
 * @return Devuelve solo las asistencias en estado presente ordanado de forma decreciente 
 * 
 * ```js
 * getAsistenciasOrderBy([idUser, 'ASC', '2'])
 * ```
 * @return Devuelve solo las asistencias en estado tarde ordanado de forma ascendiente 
 * ```js
 * getAsistenciasOrderBy([idUser, '', '3'])
 * ```
 * @return Devuelve solo las asistencias en estado ausentes ordanado de forma decreciente 
 * 
 */
async function getAsistenciasOrderBy(parametros) {

    let data = {
        fecha: [],
        puntualidad: [],
    }

    const where = {
        idAlumno: parametros[0],
    }

    if(parametros[2] !== 0){
        where.puntualidad = 
            parametros[2] === 1 ? 'Presente' :
            parametros[2] === 2 ? 'Tarde' :
            'Ausente';
    }

    if(parametros[1]){
        parametros[1] = 'DESC'
    }

    const asistencias = await Asistencia.findAndCountAll({
        attributes: ['fecha', 'puntualidad'],
        where: where,
        order: [['fecha', parametros[1]]]
    })

    for (let x = 0; x < asistencias.count; x++) {
        const fechaStr = asistencias.rows[x].dataValues.fecha;
        const fecha = new Date(fechaStr);

        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();

        const fechaFormateada = `${dia}/${mes}/${anio}`;

        data.fecha.push(fechaFormateada);
        console.log(fechaFormateada)
        data.puntualidad.push(asistencias.rows[x].dataValues.puntualidad);
    }

    return data

}

getAsistenciasOrderBy([2, 'ASC', 1])
