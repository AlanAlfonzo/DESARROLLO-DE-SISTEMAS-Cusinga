const { createPoolCluster } = require("mysql2")

async function insertDataInDB(Roles, Anio, Usuarios, alumPerfiles, precePerfiles, profPerfiles, Asistencia, Materias) {
    //Creacion de roles
    await Roles.create({ nombre: 'alumno' })
    await Roles.create({ nombre: 'preceptor' })
    await Roles.create({ nombre: 'profesor' })
    
    //Creacion de anios
    const turnos = ['maniana', 'tarde', 'noche']//
    const especialidades = ['computacion', 'mecanica', 'automotores']
/*
    for (let i = 1; i < 7; i++) {
        for (let x = 1; x < 7; x++) {
            for (let q = 0; q < 3; q++) {
                if( i < 3 ){
                    console.log(' i es menor q tres')
                    console.log(x)
                    await Anio.create({ anio: i, cursos: x, turno: turnos[q]})
                } else {

                    for (let a = 0; a < 3; a++) {
                        
                        await Anio.create({ anio: i, cursos: x, turno: turnos[q], especialidad: especialidades[a] })    
                        
                    }
                }
            }
        }
    }
*/
    //const turnos = ['maniana', 'tarde', 'noche']
    //const especialidades = ['computacion', 'mecanica', 'automotores']

    for( let i = 1; i < 7; i++ ){

        if( i < 3 ){
            let z = 0
            for( let c = 1; c < 7; c = c + 3){
                z = ( z == 2 ) ? 0 : z
                await Anio.create({ anio: i, cursos: c, turno: turnos[z] })
                await Anio.create({ anio: i, cursos: c + 1, turno: turnos[z] })
                await Anio.create({ anio: i, cursos: c + 2, turno: turnos[z] })
                
                z = z + 1
            }
        }/*else {
            let z = 0
            for( let c = 1; c < 7; c = c + 2){
                await Anio.create({ anio: i, cursos: c, turno: turnos[z] })
                await Anio.create({ anio: i, cursos: c + 1, turno: turnos[z] })
                
                z = z + 1
            }
        }*/

    }



    //Creacion de usuarios
    await Usuarios.create({ idRol: 1, password: 'Alumno1@', email: 'alumno1@gmail.com' }) // idUsuario -> 1
    await Usuarios.create({ idRol: 1, password: 'Alumno2@', email: 'alumno2@gmail.com' }) // idUsuario -> 2
    await Usuarios.create({ idRol: 2, password: 'Preceptor1@', email: 'preceptor1@gmail.com' }) // idUsuario -> 3
    await Usuarios.create({ idRol: 2, password: 'Preceptor2@', email: 'preceptor2@gmail.com' }) // idUsuario -> 4
    await Usuarios.create({ idRol: 3, password: 'Profe1@', email: 'profe1@gmail.com' }) // idUsuario -> 5
    await Usuarios.create({ idRol: 3, password: 'Profe2@', email: 'profe2@gmail.com' }) // idUsuario -> 6
    await Usuarios.create({ idRol: 3, password: 'Profe3@', email: 'profe3@gmail.com' }) // idUsuario -> 7
    await Usuarios.create({ idRol: 3, password: 'Profe4@', email: 'profe4@gmail.com' }) // idUsuario -> 8

    //Creacion de los perfiles de alumno
    await alumPerfiles.create({ idAlumno: 1, idAnio: 1, nombres: 'Pepito', apellidos: 'Juarez', dni: 11111111, telefono: '1111111111' })
    await alumPerfiles.create({ idAlumno: 2, idAnio: 2, nombres: 'Alberto', apellidos: 'Cetro', dni: 22222222, telefono: '1111111112' })
    
    //Creacion de los perfiles de prece
    await precePerfiles.create({ idPrece: 3, nombres: 'Raul', apellidos: 'Molina', dni: 33333333})
    await precePerfiles.create({ idPrece: 4, nombres: 'Teresa', apellidos: 'Palano', dni: 44444444})

    //Creacion de los perfiles de profe
    await profPerfiles.create({ idProfe: 5, nombres: 'Damian', apellidos: 'Olaso', dni: 55555555, telefono: '1111111113' })
    await profPerfiles.create({ idProfe: 6, nombres: 'Gonzalo', apellidos: 'Consorti', dni: 64666666, telefono: '1111111114' })
    await profPerfiles.create({ idProfe: 7, nombres: 'Mariano', apellidos: 'Alderete', dni: 61616466, telefono: '1111111124' })
    await profPerfiles.create({ idProfe: 8, nombres: 'Nahuel', apellidos: 'Acosta', dni: 61662166, telefono: '1111112114' })

    //Carga de asistencias
    const preceptores = [3, 4]
    const options = ['Presente', 'Tarde', 'Ausente']
    for(let x = 1; x < 23; x++){
        let fecha = new Date(`2025-06-${x}`)

        let puntualidadAlum1 = (x < 11) ? options[0] : (x < 16) ? options[1] : options[2]
        let puntualidadAlum2 = (x < 13) ? options[0] : (x < 18) ? options[1] : options[2]

        let preceptor1 = (x % 2 != 0) ? preceptores[0] : preceptores[1]
        let preceptor2 = (x % 2 == 0) ? preceptores[0] : preceptores[1]

        await Asistencia.create({idAlumno: 1, idPrece: preceptor1, fecha: fecha, puntualidad: puntualidadAlum1})
        await Asistencia.create({idAlumno: 2, idPrece: preceptor2, fecha: fecha, puntualidad: puntualidadAlum2})
        
    }

    // Creacion de materias
    /*
    await Materias.create({idProfe: 5, idAnio: 0, nombre: ''})
    await Materias.create({idProfe: 5, idAnio: 0, nombre: ''})
    await Materias.create({idProfe: 6, idAnio: 0, nombre: ''})
    await Materias.create({idProfe: 6, idAnio: 0, nombre: ''})
    await Materias.create({idProfe: 7, idAnio: 0, nombre: ''})
    await Materias.create({idProfe: 7, idAnio: 0, nombre: ''})
    await Materias.create({idProfe: 8, idAnio: 0, nombre: ''})
    await Materias.create({idProfe: 8, idAnio: 0, nombre: ''})*/
    
}

module.exports = insertDataInDB
