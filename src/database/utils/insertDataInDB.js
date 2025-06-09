
async function insertDataInDB(Roles, Anio, Usuarios, alumPerfiles, precePerfiles, profPerfiles) {
    //Creacion de roles
    await Roles.create({ nombre: 'alumno' })
    await Roles.create({ nombre: 'preceptor' })
    await Roles.create({ nombre: 'profesor' })
    
    //Creacion de anios
    const turnos = ['maniana', 'tarde', 'noche']//
    const especialidades = ['computacion', 'mecanica', 'automotores']

    for (let i = 1; i < 7; i++) {
        for (let x = 1; x < 7; x++) {
            for (let q = 0; q < 3; q++) {
                for (let a = 0; a < 3; a++) {
                    await Anio.create({ anio: i, cursos: x, turno: turnos[q], especialidad: especialidades[a] })
                }
            }
        }
    }

    //Creacion de usuarios
    await Usuarios.create({ idRol: 1, password: "Alumno1@", email: 'alumno1@gmail.com' })
    await Usuarios.create({ idRol: 1, password: "Alumno2@", email: 'alumno2@gmail.com' })
    await Usuarios.create({ idRol: 2, password: "Preceptor1@", email: 'preceptor1@gmail.com' })
    await Usuarios.create({ idRol: 2, password: "Preceptor2@", email: 'preceptor2@gmail.com' })
    await Usuarios.create({ idRol: 3, password: "Profe1@", email: 'profe1@gmail.com' })
    await Usuarios.create({ idRol: 3, password: "Profe2@", email: 'profe2@gmail.com' })

    //Creacion de los perfiles de alumno
    await alumPerfiles.create({ idAlumno: 1, idAnio: 1, nombres: 'Pepito', apellidos: 'Juarez', dni: 11111111, telefono: '1111111111' })
    await alumPerfiles.create({ idAlumno: 2, idAnio: 2, nombres: 'Alberto', apellidos: 'Cetro', dni: 22222222, telefono: '1111111112' })
    
    //Creacion de los perfiles de prece
    await precePerfiles.create({ idPrece: 3, nombres: 'Raul', apellidos: 'Molina', dni: 33333333})
    await precePerfiles.create({ idPrece: 4, nombres: 'Teresa', apellidos: 'Palano', dni: 44444444})

    //Creacion de los perfiles de profe
    await profPerfiles.create({ idProfe: 5, nombres: 'Damian', apellidos: 'Olaso', dni: 55555555, telefono: '1111111113' })
    await profPerfiles.create({ idProfe: 6, nombres: 'Gonzalo', apellidos: 'Consorti', dni: 66666666, telefono: '1111111114' })

}

module.exports = insertDataInDB
