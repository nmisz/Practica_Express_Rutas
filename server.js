const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const { infoLenguajes } = require('./src/lenguajesFrontBack');
let miJson = JSON.stringify(infoLenguajes);

//console.log(infoLenguajes.frontend[1])

console.log(typeof infoLenguajes)
console.log(typeof miJson)
//console.log(miJson)

//console.log(infoLenguajes)


//GET que accede a la raiz
app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo! Bienvenido al server con express!</h1>')
})

app.get('/api', (req, res) => {
    console.log("entrando a api")
    res.send('<h1> ENTRANDO EN /API</h1>')
})

app.get('/api/lenguajes/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(infoLenguajes));
})

app.get('/api/lenguajes/frontend', (req, res) => {
    //res.send(infoLenguajes.frontend);
    res.send(JSON.stringify(infoLenguajes.frontend));
})

app.get('/api/lenguajes/frontend/lenguajes/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.frontend.filter(
        //(lenguajes) => { lenguajes.nombre === lenguaje }
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }

    res.status(200).send(filtrado);

})


app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});




// Ejercicio 02 – Express - Rutas

// 1) Generar un endpoint, con método GET, con la ruta /api/lenguajes/backend/
// Al invocar esta ruta del servidor, me debe traer todos los lenguajes de backend.

app.get('/api/lenguajes/backend', (req, res) => {
    res.send(JSON.stringify(infoLenguajes.backend));
})



// 2) Generar un endpoint, con método GET, con la ruta /api/lenguajes/backend/
// Que reciba por URL param, el parámetro "lenguaje".
// Al invocar esta ruta del servidor, me debe traer los lenguajes de backend que coincidan el
// valor buscado.

app.get('/api/lenguajes/backend/lenguajes/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.backend.filter(
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontraron cursos de lenguaje: ${lenguaje}`)
    }

    res.status(200).send(filtrado);
})



// 3) Generar un endpoint, con método GET, con la ruta /api/lenguajes/backend/
// Que reciba por URL param, el parámetro "turno".
// Al invocar esta ruta del servidor, me debe traer los lenguajes de backend que coincidan
// con el turno buscado.

app.get('/api/lenguajes/backend/turnos/:turno', (req, res) => {
    const turno = req.params.turno.toLocaleLowerCase();
    console.log(` el turno que recibe por parametro es: ${turno}`)
    const filtrado = infoLenguajes.backend.filter(
        lenguajes => lenguajes.turno.toLocaleLowerCase() === turno
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontraron cursos en turno: ${turno}`)
    }

    res.status(200).send(filtrado);
})



// 4) Generar un endpoint, con método GET, con la ruta /api/lenguajes/frontend/
// Que reciba por URL param, el parámetro "turno".
// Al invocar esta ruta del servidor, me debe traer los lenguajes de frontend que coincidan
// con el turno buscado.

app.get('/api/lenguajes/frontend/turnos/:turno', (req, res) => {
    const turno = req.params.turno.toLocaleLowerCase();
    console.log(` el turno que recibe por parametro es: ${turno}`)
    const filtrado = infoLenguajes.frontend.filter(
        lenguajes => lenguajes.turno.toLocaleLowerCase() === turno
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontraron cursos en turno: ${turno}`)
    }

    res.status(200).send(filtrado);
})



// 5) Generar un endpoint, con método GET, con la ruta /api/lenguajes/backend/
// Que reciba por URL param, el parámetro "cantidadAlumnos".
// Al invocar esta ruta del servidor, me debe traer los lenguajes de backend tengan la misma
// cantidad de alumnos, o más, que la que se pasó por parámetro.

app.get('/api/lenguajes/backend/cantidadAlumnos/:cantidad', (req, res) => {
    const cantidadAlumnos = parseInt(req.params.cantidad);
    console.log(` la cantidad que recibe por parametro es: ${cantidadAlumnos}`)
    const filtrado = infoLenguajes.backend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cantidadAlumnos
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontraron cursos con ${cantidadAlumnos} alumnos o más.`)
    }

    res.status(200).send(filtrado);
})



// 6) Generar un endpoint, con método GET, con la ruta /api/lenguajes/frontend/
// Que reciba por URL param, el parámetro "cantidadAlumnos".
// Al invocar esta ruta del servidor, me debe traer los lenguajes de frontend tengan la misma
// cantidad de alumnos, o más, que la que se pasó por parámetro.

app.get('/api/lenguajes/frontend/cantidadAlumnos/:cantidad', (req, res) => {
    const cantidadAlumnos = parseInt(req.params.cantidad);
    console.log(` la cantidad que recibe por parametro es: ${cantidadAlumnos}`)
    const filtrado = infoLenguajes.frontend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cantidadAlumnos
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontraron cursos con ${cantidadAlumnos} alumnos o más.`)
    }

    res.status(200).send(filtrado);
})



// 7) Generar un endpoint, con método GET, con la ruta /api/lenguajes/
// Que reciba por URL param, el parámetro "cantidadAlumnos".
// Al invocar esta ruta del servidor, me debe traer TODOS los lenguajes que tengan la misma
// cantidad de alumnos, o más, que la que se pasó por parámetro.

app.get('/api/lenguajes/cantidadAlumnos/:cantidad', (req, res) => {
    const cantidadAlumnos = parseInt(req.params.cantidad);
    console.log(` la cantidad que recibe por parametro es: ${cantidadAlumnos}`)
    console.log(infoLenguajes);
    const filtradoFront = infoLenguajes.frontend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cantidadAlumnos
    )
    const filtradoBack = infoLenguajes.backend.filter(
        lenguajes => lenguajes.cantidadAlumnos >= cantidadAlumnos
    )
    const filtrado = filtradoFront.concat(filtradoBack);

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontraron cursos con ${cantidadAlumnos} alumnos o más.`)
    }

    res.status(200).send(filtrado);
})
