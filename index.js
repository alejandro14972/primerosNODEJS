

var mongoose = require('mongoose');
var app =require('./app');
var port = 3700;

mongoose.Promise= global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/portafolio') //no escribir localhost
      .then(()=>{
        console.log("exitoso");
        //creacion del serve
        app.listen(port, ()=>{
          console.log("servidor levantado");
        });
      })
      .catch(err => console.log(err));