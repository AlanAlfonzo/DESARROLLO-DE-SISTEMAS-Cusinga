const { profPerfiles, alumPerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio } = require('./src/database/models/relaciones.js')
const secretWord = 'ibujasiohdoajisdiosa90-uas8=0-da8=sd=b7as6v-bdb06a89s=67-d5v-as0c5da-v5sd50-adc50sv-s'
const sequelize = require('./src/config/mySql.js')
const login = require('./src/utils/login.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000

console.clear()

app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))
app.use(cookieParser())
app.use(express.json())
app.use(cors())

async function initSQLDatabase() {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
}

async function insertDataInDB() {
    const turnos = ['maniana', 'tarde', 'noche']
    const especialidades = ['computacion', 'mecanica', 'automotores']
    await Roles.create({ nombre: 'alumno' })
    await Roles.create({ nombre: 'preceptor' })
    await Roles.create({ nombre: 'profesor' })

    for(let i = 1; i < 7; i++){
        for(let x = 1; x < 7; x++){
            for(let q = 0; q < 3; q++){
                for(let a = 0; a < 3; a++){
                    await Anio.create({anio: i, cursos: x, turno: turnos[q], especialidad: especialidades[a]})
                }
            }
        }
    }
    await Usuarios.create({ idRol: 1, password: "Alberto1@", email: 'alberto@gmail.com' })
    await alumPerfiles.create({ idAlumno: 1, idAnio: 2, nombres: 'Alberto', apellidos: 'Cetro', dni: 47806274, telefono: '1131349152'})
}

initSQLDatabase()
.then(() => {
    console.log('Database connection established successfully!')
    insertDataInDB()
})
.catch((err) => console.log(err))

// rutas publicas

app.get('/', (req, res) => {
    const token = req.cookies.token
    if(!token){
        return res.render('home')
    }
    try {
        const data = jwt.verify(token, secretWord)
        res.render('home', data)
    } catch (error) {
        res.render('home')
    }
})

app.get('/login', (req, res) => {
    const token = req.cookies.token
    try {
        const data = jwt.verify(token, secretWord)
        res.render('home', data)
    } catch (error) {
        res.render('login')
    }
})

app.get('/register', (req, res) => {
    res.render('registro')
})

app.get('/especialidades', (req, res) => {
    const token = req.cookies.token
    if(!token){
        return res.render('especialidades')
    }
    try {
        const data = jwt.verify(token, secretWord)
        res.render('especialidades', data)
    } catch (error) {
        res.render('especialidades')
    }
})

// rutas protegidas

app.get('/panel', (req, res) => {
    const token = req.cookies.token
    if(!token){
        return res.render('login')
    }
    try {
        const data = jwt.verify(token, secretWord)
        
        console.log(data)
        res.render('home')

    } catch (error) {
        res.render('login')
    }
})

// endpoints register-login publico

app.post('/login-user', async (req, res) => {

    const { email, password } = req.body
    
    const payload = await login(email, password)
    if(payload.ok){
        const token = jwt.sign({
            idUser: payload.body.idUser,  idRol: payload.body.idRol
        },secretWord,
        {
            expiresIn: '1h'
        })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15
        })
    }
    
    res.redirect('http://localhost:3000/')

})

app.post('/register-user', (req, res) => {

    const { nombres, apellidos, dni, email, telefono, contrasenia} = req.body

    res.status(200)

})

app.listen(port, () => console.log(`Express en linea en: http://localhost:${port}`))
