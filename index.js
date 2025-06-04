//const precePerfiles = require('./src/database/models/precePerfiles.js')
const { profPerfiles, alumPerfiles, Asistencia, Usuarios, Materias, Notas, Roles, Anio } = require('./src/database/models/index.js')
const sequelize = require('./src/config/mySql.js')
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000

console.clear()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))
app.use(express.json())
app.use(cors())

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

app.get('/panel', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/html/panel.html'))
})

async function initSQLDatabase() {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
}

initSQLDatabase()
    .then(() => console.log('Database connection established successfully!'))
    .catch((err) => console.log('hola',err))

app.listen(port, () => { console.log(`Servidor corriendo en http://localhost:${port}`) })
