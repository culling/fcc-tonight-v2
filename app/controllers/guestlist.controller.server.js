var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var GuestlistModel   = mongoExport.guestlist.GuestlistModel;


exports.update = function(guestlist, done){
    console.log("Update - guestlist.controller.server - hit");

    //var guestlistString = JSON.stringify(guestlist);
    //console.log(guestlistString);


    GuestlistModel.update({"place_id": guestlist.place_id},
        {$set: {"place_id": guestlist.place_id , "guests": guestlist.guests } },
        {upsert: true},
        function(err, found){
            if(err){
                console.error(err);
                return done(err, null);
            };
        done(null, found); 
    });


}

exports.getByPlaceId = function(place_id, done){
    //GuestlistModel.collection.drop();

    GuestlistModel.find({place_id:place_id},function(err, rawResultsArray){
        if(err){
            console.error(err);
            done(err, null);
        }

        var rawResults = rawResultsArray[0];

        if (rawResults ){
            var results = rawResults;
            console.log(results);
            if(results.guestList && results.guestList.guests){
                results.guestList.guests = rawResults.guestList.guests.filter((guest) => {
                    var currentDate = new Date().shortDate();
                    return guest.date == currentDate;
                });
            }
            done(null, results);

        }else{
            //results = rawResults;
            done(null, null);    
        }


    });
};    
