const { Usuarios, alumPerfiles, profPerfiles, Anio, precePerfiles, Asistencia } = require('../database/models/relaciones.js');

async function getDataUser(idUser, idRol) {

    
    if (idRol === 1) {
        let data = {
            ok: null,
            nombres: null,
            apellidos: null,
            email: null,
            dni: null,
            telefono: null,
            anio: null,
            curso: null,
            turno: null,
            especialidad: null
        }

        const userData = await Usuarios.findAll({
            attributes: ['email'],
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
        data.dni = userData[0].dataValues.AlumPerfile.dni
        data.telefono = userData[0].dataValues.AlumPerfile.telefono
        data.anio = userData[0].dataValues.AlumPerfile.Anio.anio
        data.curso = userData[0].dataValues.AlumPerfile.Anio.cursos
        data.turno = userData[0].dataValues.AlumPerfile.Anio.turno
        data.especialidad = userData[0].dataValues.AlumPerfile.Anio.especialidad
        
        return data
        
    } 
    
    else if (idRol === 3){

        let data = {
            ok: null,
            nombres: null,
            apellidos: null,
            email: null,
            dni: null,
            telefono: null
        }

        const userData = await Usuarios.findAll({
            attributes: ['email'],
            include: [{
                model: profPerfiles,
                attributes: ['nombres', 'apellidos', 'dni', 'telefono'],
                where: {
                    idPrece : idUser
                }
            }]
        })

        data.ok = true
        data.nombres = userData[0].dataValues.profPerfiles.nombres
        data.apellidos = userData[0].dataValues.profPerfiles.apellidos
        data.email = userData[0].dataValues.email
        data.dni = userData[0].dataValues.profPerfiles.dni
        data.telefono = userData[0].dataValues.profPerfiles.telefono

        return data

    }

}

module.exports = getDataUser
