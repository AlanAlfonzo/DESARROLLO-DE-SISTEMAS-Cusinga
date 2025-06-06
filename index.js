const { profPerfiles, alumPerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio } = require('./src/database/models/relaciones.js')
const sequelize = require('./src/config/mySql.js')
const jwt = require('jsonwebtoken')
const express = require('express')
const secretWord = 'arrozConLeche'
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000

console.clear()

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
}

initSQLDatabase()
.then(() => {
    console.log('Database connection established successfully!')
    insertDataInDB()
})
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

// endpoints register-login publico

app.post('/login-user', (req, res) => {

    const token = jwt.sign({

    })

})

app.post('/register-user', (req, res) => {

    const { nombres, apellidos, dni, email, telefono, contrasenia} = req.body
    console.log()

    res.status(200)

})

app.listen(port, async () => console.log(`Express en linea en: http://localhost:${port}`))
