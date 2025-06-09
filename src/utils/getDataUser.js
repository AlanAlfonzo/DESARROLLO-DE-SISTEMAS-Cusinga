const { Usuarios, alumPerfiles, profPerfiles, Anio } = require('../database/models/relaciones.js');

/*
{
    username: 'Alberto', 
    nombre: 'Juan', 
    apellido: 'Cetro', 
    dni: "47806274", 
    mail: 'juancetroet32@gmail.com', 
    telefono: "1131349152", 
    anio: '6to', 
    curso: '2da', 
    turno: "Vespertino"
}
    idRol 1 -> alumno
    idRol 2 -> preceptor
    idRol 3 -> profesor
*/

async function getDataUser(idUser, idRol) {

    console.log(idUser, '|', idRol)
    if (idRol == 1) {
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
        // usuarios -> password, email
        // alumPerfiles -> nombres, apellidos, dni, telefono
        // anio -> anio, cursos, turno, especialidad
        console.log(userData[0].dataValues)
    }

}

getDataUser(1, 1)
