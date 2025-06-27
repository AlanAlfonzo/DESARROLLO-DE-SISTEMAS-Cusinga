const { Usuarios } = require('../models/relaciones.js')

/**
 * @param {string} email 
 * @param {string} password 
 */
async function login(email, password) {

    try{

        const userValidate = (await Usuarios.findAll({
            where: {
                email: email,
                password: password
            }
        }))[0].dataValues
        
        if(userValidate.validacion === 'pendiente'){
            return { 
                status: 1,
            }
        }
    
        return {
            status: 2,
            body: {
                idUser: userValidate.idUsuario,
                idRol: userValidate.idRol,
            }
        }
    }catch(err){
        
        return {
            status: 0,
        }
    }

}

module.exports = login
