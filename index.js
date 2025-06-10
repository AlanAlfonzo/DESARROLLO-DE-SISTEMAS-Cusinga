const { profPerfiles, alumPerfiles, precePerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio } = require('./src/database/models/relaciones.js')
const secretWord = 'ibujasiohdoajisdiosa90-uas8=0-da8=sd=b7as6v-bdb06a89s=67-d5v-as0c5da-v5sd50-adc50sv-s'
const insertDataInDB = require('./src/database/utils/insertDataInDB.js')
const getDataUser = require('./src/utils/getDataUser')
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

initSQLDatabase()
    .then(() => {
        console.log('Database connection established successfully!')
        insertDataInDB(Roles, Anio, Usuarios, alumPerfiles, precePerfiles, profPerfiles)
    })
    .catch((err) => console.log(err))


app.use((req, res, next) => {

    const token = req.cookies.token

    let data = null

    req.session = { token: data }

    try {
        data = jwt.verify(token, secretWord)
        req.session.token = data
    } catch (err) { }

    next()

})

// rutas publicas

app.get('/', async (req, res) => {
    const { token } = req.session
    if (token != null){

        let data = await getDataUser(token.idUser, token.idRol)
        //console.log('hola', data)
        return res.render('home', data)
    }
    res.render('home')

})

app.get('/login', async (req, res) => {
    const { token } = req.session
    if (token != null){

        let data = await getDataPanel()

        return res.render('home', data)
    }
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('registro')
})

app.get('/especialidades', (req, res) => {
    const { token } = req.session
    if (!token) {
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
    if (!token) {
        return res.render('login')
    }
    try {
        const data = jwt.verify(token, secretWord)

        console.log(data)

        res.render('panelAlumno',
            {
                username: 'Alberto',
                nombre: 'Juan',
                apellido: 'Cetro',
                dni: "47806274",
                mail: 'juancetroet32@gmail.com',
                telefono: "1131349152",
                anio: '6to',
                curso: '2da',
                turno: "Vespertino"
            })

    } catch (error) {
        res.render('login')
    }
})

// endpoints register-login publico

app.post('/login-user', async (req, res) => {

    const { email, password } = req.body

    const payload = await login(email, password)
    if (payload.ok) {
        const token = jwt.sign({
            idUser: payload.body.idUser, idRol: payload.body.idRol
        }, secretWord,
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

    res.redirect('http://localhost:3000/')

})

app.post('/register-user', (req, res) => {

    const { nombres, apellidos, dni, email, telefono, contrasenia } = req.body

    res.status(200)

})

app.listen(port, () => console.log(`Express en linea en: http://localhost:${port}`))
