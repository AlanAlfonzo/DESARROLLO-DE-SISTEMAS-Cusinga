const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000

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
