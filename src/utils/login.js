import { response } from "express";
import { Usuarios } from "../database/models/relaciones.js";

const email = 'alberto@gmail.com'
const password = 'Alberto1@'
 
const userValidate = await Usuarios.findAll({where: {email: email, password: password}})

console.log(userValidate[0])
