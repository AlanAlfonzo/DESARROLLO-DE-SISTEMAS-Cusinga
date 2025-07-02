//const { Usuarios, AlumPerfiles, ProfPerfiles, Anio, PrecePerfiles, Asistencia } = require('../database/models/relaciones.js');
const Usuarios = require('../database/models/Usuarios.js');
const AlumPerfiles = require('../database/models/AlumPerfiles.js');
const ProfPerfiles = require('../database/models/ProfPerfiles.js');
const Anio = require('../database/models/Anio.js');
const PrecePerfiles = require('../database/models/PrecePerfiles.js');
const Asistencia = require('../database/models/Asistencias.js');


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
                model: AlumPerfiles,
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
    
    else if( idRol === 2){

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
                model: PrecePerfiles,
                attributes: ['nombres', 'apellidos', 'dni', 'telefono'],
            }],
            where: {
                idUsuario: idUser
            }
        })

        data.ok = true
        data.nombres = userData[0].dataValues.precePerfile.nombres
        data.apellidos = userData[0].dataValues.precePerfile.apellidos
        data.email = userData[0].dataValues.email
        data.dni = userData[0].dataValues.precePerfile.dni
        data.telefono = userData[0].dataValues.precePerfile.telefono

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
        //console.log('hola')

        const userData = await Usuarios.findAll({
            attributes: ['email'],
            include: [{
                model: ProfPerfiles,
                attributes: ['nombres', 'apellidos', 'dni', 'telefono'],
            }],
            where: {
                idUsuario: idUser
            }
        })

        //console.log(userData[0].dataValues.ProfPerfile)

        data.ok = true
        data.nombres = userData[0].dataValues.ProfPerfile.nombres
        data.apellidos = userData[0].dataValues.ProfPerfile.apellidos
        data.email = userData[0].dataValues.email
        data.dni = userData[0].dataValues.ProfPerfile.dni
        data.telefono = userData[0].dataValues.ProfPerfile.telefono

        return data

    }

}

module.exports = getDataUser
