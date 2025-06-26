const { profPerfiles, alumPerfiles, precePerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio } = require('./src/database/models/relaciones.js')
const insertDataInDB = require('./src/database/utils/insertDataInDB.js')
const getAsistenciasAlumno = require('./src/utils/getAsistenciasAlum')
const getDataUser = require('./src/utils/getDataUser')
const getNotasAlum = require('./src/utils/getNotasAlum.js')
const login = require('./src/database/utils/login.js')
const sequelize = require('./src/config/mySql.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.port || 3000

console.clear()

app.set('views', path.join(__dirname, 'src', 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(cors())

async function initSQLDatabase() {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
}

initSQLDatabase()
    .then(() => {
        console.log('Database connection established successfully!')
        insertDataInDB()
    })
    .catch((err) => console.log(err))

function getToken(req, res, next){

    const token = req.cookies.token
    req.session = { token: null }

    try {
        let result = jwt.verify(token, process.env.secretWord)
        req.session.token = result
    } catch (err) { }

    next()

}

function redirect(req, res, next){

    const { token } = req.session
    if (token != null ){
        return res.redirect(`http://localhost:${port}`)
    }

    next()
}

app.use('/', getToken)

// rutas publicas

app.get('/panelProf', (req, res) => {
    res.render('panelDocente', {nombres: 'Gonzalo'})
})

app.get('/', async (req, res) => {
    const { token } = req.session
    if (token != null){

        let data = await getDataUser(token.idUser, token.idRol)
        return res.render('home', data)
    }
    res.render('home')

})

app.get('/login', redirect, (req, res) => {

    return res.render('login')
})

app.get('/register', redirect, (req, res) => {
    
    return res.render('registro')
})

app.get('/especialidades', async (req, res) => {
    const { token } = req.session
    if (token != null) {
        let data = await getDataUser(token.idUser, token.idRol)
        return res.render('especialidades', data)
    }
    return res.render('especialidades')
})

// rutas protegidas

app.get('/panel', async (req, res) => {
    
    const { token } = req.session

    if(token === null){
        return res.redirect('home')
    }

    const userData = await getDataUser(token.idUser, token.idRol)

    // Vista Alumno
    if(token.idRol === 1){
        let asistencias = await getAsistenciasAlumno(token.idUser)
        let notas = await getNotasAlum(token.idUser)
        const info = { ...userData, ...asistencias, ...notas}
        return res.render('panelAlumno', info)
    }

    // Vista Preceptor
    else if(token.idRol === 2){
        const info = { ...userData}
        return res.render('panelPreceptor', info)
    }

    // Vista Profesor
    else if(token.idRol === 3){
        const info = { ...userData}
        return res.render('panelDocente', info)
    }

})

app.post('/logout', async (req, res) => {
    res.clearCookie('token')
    res.json({
        ok: true
    })
})

// endpoints register-login publico

app.post('/login', async (req, res) => {

    const { email, password } = req.body

    const payload = await login(email, password)

    if(payload.error){
        console.log(payload.error)
    }
    //console.log(payload)
    if (payload.status == 2) {
        const token = jwt.sign({
            idUser: payload.body.idUser, idRol: payload.body.idRol
        }, process.env.secretWord,
            {
                expiresIn: '15m'
            })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15
        })
    }

    res.redirect('/')

})

app.post('/register', async (req, res) => {

    const { nombres, apellidos, dni, email, telefono, password } = req.body
    let error = 'email'
    try{
        await Usuarios.create({ email: email, password: password })
        const userData = await Usuarios.findAll({where: {email: email}})
        await alumPerfiles.create({idAlumno: userData[0].dataValues.idUsuario ,nombres: nombres, apellidos: apellidos, dni: dni, telefono: telefono})
        return res.redirect('/') /* ver la manera de comunicar de que se creo la cuenta con exito */
    }catch(err){
        
        if (err.errors[0].path == 'email'){
            error = 'email'
        }
        if (err.errors[0].path == 'dni'){
            error = 'dni'
        }
        if (err.errors[0].path == 'telefono'){
            error = 'telefono'
        }
        return res.render('registro', error) // ver la manera de comunicar de que hay algun error con los datos
    }

})

app.listen(port, () => console.log(`Express en linea en: http://localhost:${port}`))
