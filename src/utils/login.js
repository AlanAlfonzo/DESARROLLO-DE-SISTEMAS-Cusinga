import { response } from "express";
import { Usuarios } from "../database/models/relaciones.js";

const email = 'alberto@gmail.com'
const password = 'Alberto1@'
 
const userValidate = await Usuarios.findAll({where: {email: email, password: password}})


if(userValidate[0].dataValues)
    return {status: 200, body : {
        idUser: userValidate[0].dataValues.idUsuario, 
        idRol: userValidate[0].dataValues.idRol,
        validacion: userValidate[0].dataValues.validacion
    }}

else{
    return 
}
