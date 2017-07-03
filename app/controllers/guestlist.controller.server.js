var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var GuestlistModel   = mongoExport.guestlist.GuestlistModel;


exports.create = function(guestlist){
    console.log("Create - guestlist.controller.server - hit");
    console.log(guestlist);

}

exports.getByPlaceId = function(place_id, done){
    GuestlistModel.find({id:place_id},function(err, rawResults){
        if(err){
            console.error(err);
            done(err, null);

        }

        if (rawResults && (rawResults.length > 0)){
            var results = rawResults;
            //console.log(results);
            results.guestList.guests = rawResults.guestList.guests.filter((guest) => {
                var currentDate = new Date().shortDate();
                return guest.date == currentDate;
            });
            done(null, results);

        }else{
            //results = rawResults;
            done(null, null);
            
        }
    });
};    
