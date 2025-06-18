const { Asistencia } = require('../database/models/relaciones')

async function getAsistenciasAlumno(idUser) {
    
    let data = {
        info: true,
        asistencias: (await Asistencia.findAndCountAll({where:{idAlumno: idUser,puntualidad: 'Presente'}})).count,
        tardes: (await Asistencia.findAndCountAll({where:{idAlumno: idUser,puntualidad: 'Tarde'}})).count,
        ausentes: (await Asistencia.findAndCountAll({where:{idAlumno: idUser,puntualidad: 'Ausente'}})).count,
        fecha: [],
        puntualidad: []
    }

    let asistencias = await Asistencia.findAndCountAll({
        attributes: ['fecha', 'puntualidad'],
        where: {idAlumno: idUser},
        order: [['fecha', 'DESC']]
    })
    
    for(let x = 0; x < asistencias.count; x++){

        data.fecha.push((asistencias.rows[x].dataValues.fecha).toISOString().split('T')[0])
        data.puntualidad.push(asistencias.rows[x].dataValues.puntualidad)
        
    }

    return data

}

module.exports = getAsistenciasAlumno
