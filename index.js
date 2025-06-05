const { profPerfiles, alumPerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio } = require('./src/database/models/relaciones.js')
const sequelize = require('./src/config/mySql.js')
const jwt = require('jsonwebtoken')
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000
const secretWord = 'arrozConLeche'
console.clear()

async function initSQLDatabase() {
    await sequelize.authenticate()
    await sequelize.sync({ force: false })
}

initSQLDatabase()
    .then(() => console.log('Database connection established successfully!'))
    .catch((err) => console.log(err))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))
app.use(express.json())
app.use(cors())

// rutas publicas

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/html/home.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/html/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/html/registro.html'))
})

app.get('/especialidades', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/html/especialidades.html'))
})

// rutas protegidas

app.get('/panel', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/html/panel.html'))
})

// endpoints publicos

app.post('/login-user', (req, res) => {

})

app.post('/register-user', (req, res) => {

})

app.listen(port, async () => {
    // const result = await Roles.findOne({where: {nombre: 'alumno'}}) -> consulta select from con where
    // const result = await Roles.findByPk(1) -> consulta por PK directo
    //await Roles.create({ nombre: 'alumno'})
    //await Roles.create({ nombre: 'preceptor'})
    //await Roles.create({ nombre: 'profesor'})
    await Usuarios.create({idRol: 1, username: 'juanito', password: "Alberto1@", email: 'alberto@gmail.com'})
    //console.log(result)
    //console.log(await Usuarios.findByPk(1))

})
