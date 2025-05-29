const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken');
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const passwordCookie = 'claveSecreta123'
const port = 3000

const sql = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escuelaEt32',
})

console.clear()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))
app.use(express.json())
app.use(cookieParser());
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/html/home.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/html/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/html/registro.html'))
})

app.get('/especialidades', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/html/especialidades.html'))
})

app.get('/panel', (req, res) => {
    res.sendFile(path.join(__dirname,'/src/html/panel.html'))
})

app.post('/login', async (req, res) => {
    const mail = req.body['mail']
    const password = req.body['password']
    const rol = req.body['rol']
    if (rol == 'alumno') {
        let results = await sql.query(`SELECT id, verificacion FROM alumnos WHERE mail = '${mail}' AND passw = '${password}'`)
        try {
            if (results[0][0]['id'] && results[0][0]['verificacion'] == 'Verificado') {
                res.json({ body: {status: 200}})
            } else if (results[0][0]['id'] && results[0][0]['verificacion'] != 'Verificado') {
                res.json({ body: {status: 200, verificacion: 'pendiente' }})
            }
        } catch (error) {
            res.json({ body: { status: 404, message: 'Datos incorrectos'}})
        }
    } else if (rol == 'profe') {
        let results = await sql.query(`SELECT id, moderation FROM profesores WHERE mail = '${mail}' AND passw = '${password}'`)
        try {
            if (results[0][0]['id']) {
                res.json({ body: {status: 200}})
            }
        } catch (error) {
            res.json({ body: {status: 404}})
        }
    } else {
        res.json({ body : { status: 404, message: 'Hay un error con en la peticion' }})
    }

})

app.post('/registrar-alumno', async (req, res) => {
    const nombres = req.body['nombres']
    const apellidos = req.body['apellidos']
    const dni = req.body['dni']
    const mail = req.body['mail']
    const telefono = req.body['telefono']
    const password = req.body['password']

    var results = await sql.query(`SELECT id FROM alumnos WHERE mail = '${mail}';`)

    try {
        if (results[0][0]['id']) {
            res.json({ body: {status: 404}})
        }
    } catch (error) {
        var results = await sql.query(`INSERT INTO alumnos (nombres, apellidos, dni, mail, passw) VALUES ("${nombres}", "${apellidos}", ${dni}, "${mail}", "${password}");`)
        const result = results[0]['affectedRows']
        if (result == 1) {
            res.json({ body: {status: 200}})
        }
    }
})

app.post('/anotar-asistencia', async (req, res) => {
    const idAlumno = req.body['idAlumno']
    const idProfe = req.body['idProfe']
    const materia = req.body['materia']
    const fechaHora = req.body['fechaHora']
    const puntualidad = req.body['puntualidad']

    let results = await sql.query(`INSERT INTO asistencia (idAlumno, idProfe, materia, fechaHora, puntualidad) VALUES (${idAlumno}, ${idProfe}, '${materia}', '${fechaHora}', '${puntualidad}'`)

    if(results[0]['affectedRows'] != 0){
        res.json({ body: {status: 200 }})
    }else{
        res.json({ body: {status: 400 }})
    }
})

app.post('/obtener-asistencia', async (req, res) => {
    const idAlumno = req.body['idAlumno']
    const materia = req.body['materia']

    let results = await sql.query(`SELECT a.nombres, a.apellidos, asis.materia, asis.fechaHora, asis.puntualidad FROM alumnos a INNER JOIN asistencia asis ON ${idAlumno} = asis.idAlumno WHERE materia = '${materia}'`)

    res.json({ body: results[0] })

})

app.post('/subir-notas', async (req, res) => {
    const idAlumno = req.body['idAlumno']
    const idProfe = req.body['idProfe']
    const materia = req.body['materia']
    const nota = req.body['nota']
    const fecha = req.body['fecha']

    let results = await sql.query(`INSERT INTO notas (idAlumno, idProfe, nota, materia, fecha) values (${idAlumno}, ${idProfe}, ${nota}, ${materia}, ${fecha})`)
    
    if(results[0]['affectedRows'] != 0){
        res.json({ body: {status: 200}})
    }else{
        res.json({body: {status: 404}})
    }

})

app.post('/obtener-notas', async (req, res) => {
    const idAlumno = req.body['idAlumno']
    const materia = req.body['materia']

    let results = await sql.query(`SELECT a.nombres, a.apellidos, n.nota, n.materia, n.fecha FROM alumnos a INNER JOIN notas n ON ${idAlumno} = n.idAlumno WHERE materia = '${materia}'`)

    res.json({body: results[0]})

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
