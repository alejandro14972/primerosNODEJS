/* configuracion de express y noide parse */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//cargar archivo de rutas
var project_routes = require('./rutes/project')

//midlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//cors

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas

app.use('/api', project_routes)

/* app.get('/',(req, res)=>{
    res.status(200).send(
        "<h1>Página de inicio</h1>"
    )
})

app.post('/test',(req, res)=>{
    console.log(req);
    console.log(req.body.nombre +" "+ req.body.apellidos);
    res.status(200).send({
        message: "hola mundo"
    })
}) */


//exportar modulo
module.exports = app;