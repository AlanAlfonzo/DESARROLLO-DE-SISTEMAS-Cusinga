const { Usuarios, alumPerfiles, profPerfiles, Anio, precePerfiles, Asistencia } = require('../database/models/relaciones.js');

async function getAsistenciasAlumno(idUser) {
    
    let data = {
        info: true,
        asistencias: (await Asistencia.findAndCountAll({where:{idAlumno: idUser,puntualidad: 'Presente'}})).count,
        tardes: (await Asistencia.findAndCountAll({where:{idAlumno: idUser,puntualidad: 'Tarde'}})).count,
        ausentes: (await Asistencia.findAndCountAll({where:{idAlumno: idUser,puntualidad: 'Ausente'}})).count,
        fecha: [],
        puntualidad: []
    }

    let asistencias = await Asistencia.findAndCountAll({where: {idAlumno: idUser}})
    
    for(let x = 0; x < asistencias.count; x++){

        data.fecha = (asistencias.rows[x].dataValues.fecha).toISOString().split('T')[0]
        data.puntualidad = asistencias.rows[x].dataValues.puntualidad
        
    }

    return data

}

async function getDataUser(idUser, idRol) {

    
    if (idRol === 1) {

        let data = {
            ok: null,
            nombres: null,
            apellidos: null,
            email: null,
            password: null,
            dni: null,
            telefono: null,
            anio: null,
            curso: null,
            turno: null,
            especialidad: null
        }

        const userData = await Usuarios.findAll({
            attributes: ['password', 'email'],
            where: {
                idUsuario: idUser
            },
            include: [{
                model: alumPerfiles,
                attributes: ['nombres', 'apellidos', 'dni', 'telefono'],
                include: [{
                    attributes: ['anio', 'cursos', 'turno', 'especialidad'],
                    model: Anio,
                }],
                where: {
                    idAlumno: idUser
                }
            }]
        })

        data.ok = true
        data.nombres = userData[0].dataValues.AlumPerfile.nombres
        data.apellidos = userData[0].dataValues.AlumPerfile.apellidos
        data.email = userData[0].dataValues.email
        data.password = userData[0].dataValues.password
        data.dni = userData[0].dataValues.AlumPerfile.dni
        data.telefono = userData[0].dataValues.AlumPerfile.telefono
        data.anio = userData[0].dataValues.AlumPerfile.Anio.anio
        data.curso = userData[0].dataValues.AlumPerfile.Anio.cursos
        data.turno = userData[0].dataValues.AlumPerfile.Anio.turno
        data.especialidad = userData[0].dataValues.AlumPerfile.Anio.especialidad
        return data
        
    } 
    
    else if (idRol === 2){
        const userData = await Usuarios.findAll({
            attributes: ['password', 'email'],
            include: [{
                model: precePerfiles,
                attributes: ['nombres', 'apellidos', 'dni'],
                include: [{
                    model: Asistencia
                }],
                where: {
                    idPrece : idUser
                }
            }]
        })
    }

}

module.exports = getDataUser
