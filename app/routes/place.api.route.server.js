const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");


//var passport    = require("passport");
//var users       = require("./../controllers/user.controller.server");
var placeController      = require("./../controllers/place.controller.server");




router.get("/:id", function(req, res){
    placeController.getPlacesNearAddress(req.params.id, "bar", function(placesResult){
        var places = placesResult.json.results;
        res.write(JSON.stringify(places, null, "\t"));
        res.end();        
    });

});



module.exports = router;