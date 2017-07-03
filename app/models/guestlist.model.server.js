"use strict";
var config  = require("./../../config/config");

//Crypto 
//var crypto      = require('crypto');


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

var GuestlistSchema = new Schema({
    place_id:   {
        type:       String,
        required:   true
    },
    guests:     Array
});


// Compile model from schema
var GuestlistModel       = mongoose.model('Guestlist', GuestlistSchema );
exports.GuestlistModel   = GuestlistModel;