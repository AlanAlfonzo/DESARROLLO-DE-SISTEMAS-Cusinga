const PrecePerfiles = require('../models/PrecePerfiles.js')
const AlumPerfiles = require('../models/AlumPerfiles.js')
const ProfPerfiles = require('../models/ProfPerfiles.js')
const Asistencia = require('../models/Asistencias.js')
const Usuarios = require('../models/Usuarios.js')
const Materias = require('../models/Materias.js')
const Notas = require('../models/Notas.js')
const Roles = require('../models/Roles.js')
const Anio = require('../models/Anio.js')


async function insertDataInDB() {

    //Creacion de roles
    await Roles.create({ nombre: 'alumno' })
    await Roles.create({ nombre: 'preceptor' })
    await Roles.create({ nombre: 'profesor' })
    
    //Creacion de anios
    const turnos = ['maniana', 'tarde', 'noche']//
    const especialidades = ['computacion', 'mecanica', 'automotores']

    for( let numAnio = 1; numAnio < 7; numAnio++ ){

        if( numAnio < 3 ){

            let z = 0
            for( let c = 1; c < 11; c = c + 5){
                z = ( z == 2 ) ? 0 : z
                await Anio.create({ anio: numAnio, cursos: c, turno: turnos[z] })
                await Anio.create({ anio: numAnio, cursos: c + 1, turno: turnos[z] })
                await Anio.create({ anio: numAnio, cursos: c + 2, turno: turnos[z] })
                await Anio.create({ anio: numAnio, cursos: c + 3, turno: turnos[z] })
                await Anio.create({ anio: numAnio, cursos: c + 4, turno: turnos[z] })
                z = z + 1
            }

        } else if ( numAnio == 3 ) {

            let z = 0
            for( let c = 1;  c < 13; c = c + 6){
                z = ( z == 2 ) ? 0 : z
                await Anio.create({ anio: numAnio, cursos: c, turno: turnos[z], especialidad: especialidades[0] })
                await Anio.create({ anio: numAnio, cursos: c + 1, turno: turnos[z], especialidad: especialidades[0] })
                await Anio.create({ anio: numAnio, cursos: c + 2, turno: turnos[z], especialidad: especialidades[1] })
                await Anio.create({ anio: numAnio, cursos: c + 3, turno: turnos[z], especialidad: especialidades[1] })
                await Anio.create({ anio: numAnio, cursos: c + 4, turno: turnos[z], especialidad: especialidades[2] })
                await Anio.create({ anio: numAnio, cursos: c + 5, turno: turnos[z], especialidad: especialidades[2] })
                z = z + 1
            }

        } else {
            let z = 0
            for( let c = 1;  c < 10; c = c + 3){
                z = ( z == 3 ) ? 0 : z
                await Anio.create({ anio: numAnio, cursos: c, turno: turnos[z], especialidad: especialidades[0] })
                await Anio.create({ anio: numAnio, cursos: c + 1, turno: turnos[z], especialidad: especialidades[1] })
                await Anio.create({ anio: numAnio, cursos: c + 2, turno: turnos[z], especialidad: especialidades[2] })
                z = z + 1
            }
        }
    }



    //Creacion de usuarios
    await Usuarios.create({ idRol: 1, password: 'Alumno1@', email: 'alumno1@gmail.com', validacion: 'validado' }) // idUsuario -> 1
    await Usuarios.create({ idRol: 1, password: 'Alumno2@', email: 'alumno2@gmail.com', validacion: 'validado'  }) // idUsuario -> 2
    await Usuarios.create({ idRol: 2, password: 'Preceptor1@', email: 'preceptor1@gmail.com', validacion: 'validado'  }) // idUsuario -> 3
    await Usuarios.create({ idRol: 2, password: 'Preceptor2@', email: 'preceptor2@gmail.com', validacion: 'validado'  }) // idUsuario -> 4
    await Usuarios.create({ idRol: 3, password: 'Profe1@', email: 'profe1@gmail.com', validacion: 'validado'  }) // idUsuario -> 5
    await Usuarios.create({ idRol: 3, password: 'Profe2@', email: 'profe2@gmail.com', validacion: 'validado'  }) // idUsuario -> 6
    await Usuarios.create({ idRol: 3, password: 'Profe3@', email: 'profe3@gmail.com', validacion: 'validado'  }) // idUsuario -> 7
    await Usuarios.create({ idRol: 3, password: 'Profe4@', email: 'profe4@gmail.com', validacion: 'validado'  }) // idUsuario -> 8
    await Usuarios.create({ idRol: 3, password: 'Profe5@', email: 'profe5@gmail.com', validacion: 'validado'  }) // idUsuario -> 9
    
    //Creacion de los perfiles de alumno
    await AlumPerfiles.create({ idAlumno: 1, idAnio: 45, nombres: 'Pepito', apellidos: 'Juarez', dni: 11111111, telefono: '1111111111' })
    await AlumPerfiles.create({ idAlumno: 2, idAnio: 57, nombres: 'Alberto', apellidos: 'Cetro', dni: 22222222, telefono: '1111111112' })
    
    //Creacion de los perfiles de prece
    await PrecePerfiles.create({ idPrece: 3, nombres: 'Raul', apellidos: 'Molina', dni: 33333333, telefono: '1131111113'})
    await PrecePerfiles.create({ idPrece: 4, nombres: 'Teresa', apellidos: 'Palano', dni: 44444444, telefono: '1111111213'})

    //Creacion de los perfiles de profe
    await ProfPerfiles.create({ idProfe: 5, nombres: 'Damian', apellidos: 'Olaso', dni: 55555555, telefono: '1111111113' })
    await ProfPerfiles.create({ idProfe: 6, nombres: 'Gonzalo', apellidos: 'Consorti', dni: 64666666, telefono: '1111111114' })
    await ProfPerfiles.create({ idProfe: 7, nombres: 'Mariano', apellidos: 'Alderete', dni: 61616466, telefono: '1111111124' })
    await ProfPerfiles.create({ idProfe: 8, nombres: 'Nahuel', apellidos: 'Acosta', dni: 61662166, telefono: '1111112114' })
    await ProfPerfiles.create({ idProfe: 9, nombres: 'asd', apellidos: 'asd', dni: 61622166, telefono: '1121112114' })

    //Carga de asistencias
    const preceptores = [3, 4]
    const options = ['Presente', 'Tarde', 'Ausente']
    for(let x = 1; x < 23; x++){
        let fecha = new Date(`2025-06-${x}`).toISOString().split('T')[0];

        let puntualidadAlum1 = (x < 11) ? options[0] : (x < 16) ? options[1] : options[2]
        let puntualidadAlum2 = (x < 13) ? options[0] : (x < 18) ? options[1] : options[2]

        let preceptor1 = (x % 2 != 0) ? preceptores[0] : preceptores[1]
        let preceptor2 = (x % 2 == 0) ? preceptores[0] : preceptores[1]

        await Asistencia.create({idAlumno: 1, idPrece: preceptor1, fecha: fecha, puntualidad: puntualidadAlum1})
        await Asistencia.create({idAlumno: 2, idPrece: preceptor2, fecha: fecha, puntualidad: puntualidadAlum2})
        
    }

    // Creacion de materias
    
    await Materias.create({idProfe: 5, idAnio: 45, nombre: 'Base de datos'}) // Olaso tiene 'Base de datos' con 4to 7ma de la noche | idMate 1
    await Materias.create({idProfe: 5, idAnio: 57, nombre: 'Practicas Profesionalizantes'}) // Olaso tiene 'PP' con 6to 7ma de la noche | idMate 2
    await Materias.create({idProfe: 6, idAnio: 45, nombre: 'Proyecto Informatico I'}) // Gonzalo tiene 'Proyecto Informatico I' con 4to 7ma de la noche | idMate 3
    await Materias.create({idProfe: 6, idAnio: 57, nombre: 'Proyecto Informatico II'}) // Gonzalo tiene 'Proyecto Informatico I' con 4to 4ta de la tarde | idMate 4
    await Materias.create({idProfe: 7, idAnio: 57, nombre: 'Matematicas'}) // Alderete tiene 'Matematicas' con 3ro 9na de la | idMate 5
    await Materias.create({idProfe: 7, idAnio: 57, nombre: 'Matematicas'}) // Alderete tiene 'Matematicas' con 3ro 10ma de la | idMate 6
    await Materias.create({idProfe: 8, idAnio: 45, nombre: 'Proyecto Informatico II'}) // Nahuel tiene 'Proyecto Informatico II' con 5to 4ta de la tarde | idMate 7
    await Materias.create({idProfe: 8, idAnio: 57, nombre: 'Administracion De Sistemas & Redes'}) // Nahuel tiene 'Administracion De Sistemas & Redes' con 6to 7ma de la noche | idMate 8
    
    await Notas.create({idProfe: 5, idAlumno: 1, idMateria: 1, nota: 8})
    await Notas.create({idProfe: 5, idAlumno: 1, idMateria: 1, nota: 4})
    await Notas.create({idProfe: 5, idAlumno: 1, idMateria: 2, nota: 4})
    await Notas.create({idProfe: 5, idAlumno: 1, idMateria: 2, nota: 4})
    await Notas.create({idProfe: 5, idAlumno: 2, idMateria: 1, nota: 9})
    await Notas.create({idProfe: 5, idAlumno: 2, idMateria: 1, nota: 4})
    await Notas.create({idProfe: 5, idAlumno: 2, idMateria: 2, nota: 2})
    await Notas.create({idProfe: 5, idAlumno: 2, idMateria: 2, nota: 2})
    await Notas.create({idProfe: 6, idAlumno: 1, idMateria: 3, nota: 5})
    await Notas.create({idProfe: 6, idAlumno: 1, idMateria: 3, nota: 2})
    await Notas.create({idProfe: 6, idAlumno: 1, idMateria: 4, nota: 9})
    await Notas.create({idProfe: 6, idAlumno: 1, idMateria: 4, nota: 10})
    await Notas.create({idProfe: 6, idAlumno: 2, idMateria: 3, nota: 8})
    await Notas.create({idProfe: 6, idAlumno: 2, idMateria: 3, nota: 1})
    await Notas.create({idProfe: 6, idAlumno: 2, idMateria: 4, nota: 5})
    await Notas.create({idProfe: 6, idAlumno: 2, idMateria: 4, nota: 2})
    
}

module.exports = insertDataInDB
