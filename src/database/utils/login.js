const { Usuarios, alumPerfiles } = require('../models/relaciones.js')

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
    }))[0]
    console.log(userValidate)
    try {
        if (userValidate[0].dataValues) {
            return {
                ok: 'ok',
                body: {
                    idUser: userValidate[0].dataValues.idUsuario,
                    idRol: userValidate[0].dataValues.idRol,
                }
            }
        }
    } catch (error) {
        return {
            status: 404,
            error: error
        }
    }
}

module.exports = login
