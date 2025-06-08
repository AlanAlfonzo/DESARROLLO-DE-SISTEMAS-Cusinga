const { Usuarios, alumPerfiles } = require('../database/models/relaciones.js')

/**
 * @param {string} email 
 * @param {string} password 
 */
async function login(email, password) {

    const userValidate = await Usuarios.findAll({
        where: { 
            email: email, 
            password: password
        }
    })
    try {
        if (userValidate[0].dataValues) {
            const names = await alumPerfiles.findAll({
                where: {
                    idAlumno: userValidate[0].dataValues.idUsuario
                }
            })
            return {
                ok: 'ok',
                body: {
                    idUser: userValidate[0].dataValues.idUsuario,
                    idRol: userValidate[0].dataValues.idRol,
                    nombres: names[0].dataValues.nombres,
                    validacion: userValidate[0].dataValues.validacion
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
