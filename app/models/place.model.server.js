"use strict";
var config  = require("./../../config/config");


// mongo
var mongo               = require("mongodb").MongoClient;
var mongoUrl            = config.mongoUrl;

// Mongoose
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl);
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    geometry:   String,
    icon:       String,
    id:         String,
    name:       String,
    opening_hours:  String,
    photos:     String,
    place_id:   String,
    price_level:    String,
    rating:     String,
    reference:  String,
    scope:      String,
    types:      String,
    vicinity:   String,
    going:      String
});


// Compile model from schema
var PlaceModel       = mongoose.model('Place', PlaceSchema );
exports.PlaceModel   = PlaceModel;