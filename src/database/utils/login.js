const { Usuarios } = require('../models/relaciones.js')

/**
 * @param {string} email 
 * @param {string} password 
 */
async function login(email, password) {

    const userValidate = (await Usuarios.findAll({
        where: {
            email: email,
            password: password
        }
    }))[0].dataValues
    //console.log(userValidate)

    if (!userValidate) {
        return {
            status: 0,
            error: error
        }
    }

    if(userValidate.validacion === 'pendiente'){
        return { 
            status: 1,
        }
    }

    //console.log('hola')
    return {
        status: 2,
        body: {
            idUser: userValidate.idUsuario,
            idRol: userValidate.idRol,
        }
    }

    

}

module.exports = login
