'use strict'
var mongoose = require('mongoose');

//modelo esquema propiedades paradarle un valor
var Schema = mongoose.Schema;
var ProjectSchema = Schema({
    name:String,
    description:String,
    category:String,
    year:Number,
    langs:String,
    img:String
});

module.exports = mongoose.model('Project', ProjectSchema)
                                //prjects-> guarda los documentos en la coleccion