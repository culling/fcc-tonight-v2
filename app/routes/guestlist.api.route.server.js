const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
//var mongoExport = require("./../../config/mongo");


//var passport    = require("passport");
//var users       = require("./../controllers/user.controller.server");
//var places      = require("./../controllers/places.controller.server");
var guestlistController = require("./../controllers/guestlist.controller.server");


router.put("/", function(req, res){
    console.log("PUT guestList hit");

    var guestList = {
        place_id:   req.body.place_id,
        guests:     req.body.guests
    };
    console.log(guestList);
    guestlistController.update(guestList, function(err, found){
        if(err){console.error(err)};

        res.write("done");
        res.end();
    });
});

router.get("/:id", function(req, res){
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    };

    Date.prototype.shortDate = function() {
    return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate())
    };

    guestlistController.getByPlaceId(req.params.id, function(err, results){
        if(err){
            console.error(err);
        };

        //console.log(results);
        res.write(JSON.stringify(results, null, "\t"));
        res.end();
    });
});


/*
router.get("/:id", function(req, res){
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    Date.prototype.shortDate = function() {
    return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate())
    };

    mongoExport.guestList.getByPlaceId(req.params.id, function(err, rawResults){
        if(err){
            res.write(err);
        }

        if (rawResults){
            var results = rawResults;
            results.guestList.guests = rawResults.guestList.guests.filter((guest) => {
                var currentDate = new Date().shortDate();
                return guest.date == currentDate;
            });
        }else{
            results = rawResults;
        }
        res.write(JSON.stringify(results));

        res.end();

    });

});
*/


module.exports = router;