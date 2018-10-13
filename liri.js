require("dotenv").config();

/*Global Variables
==============================================================*/
//Packages and Modules
var fs = require('fs');
var spotify = require('spotify');
//var spotify = new Spotify(keys.spotify);
//var twitter = require('twitter');
var keys = require('./keys');
//let moment = require('moment');
var request = require('request');
const chalk = require('chalk');

//Inputs
let inputs = process.argv[2];


//-------Functions--------
function liriMeThis() {
    switch (inputs) {
        case "movie-this":
            omdbAPI();
            break;

        case "concert-this":
            bandsInTownAPI();
            break;

        case "spotify-this":
            spotifyMe();
            break;

    }
}
//////////////////// M O V I E S ////////////////////
function omdbAPI() {
    let movieName = process.argv.splice(3);
    const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, (err, response, body) => {

        if (!err && response.statusCode === 200) {
            let movieName = JSON.parse(body);
            let movieData = (`
       ${(chalk.green('Movie Title: ' + movieName.Title))}
       ${(chalk.yellow('Year: ' + movieName.Year))}
       ${(chalk.yellow('Rated: ' + movieName.Rated))}
       ${(chalk.yellow('IMDB Rating: ' + movieName.imdbRating))}
       ${(chalk.yellow("Rotten Tomato Rating: " + movieName.Ratings[1].Value))}
       ${(chalk.yellow('Country: ' + movieName.Country))}
       ${(chalk.yellow('Languages: ' + movieName.Language))}
       ${(chalk.yellow('Plot: ' + movieName.Plot))}
       ${(chalk.yellow('Actors: ' + movieName.Actors))}
       `);

            console.log(movieData);
        };
        if (err) {
            console.log("Are you sure that's the right movie?!")
        };
    });
};


///////////////// B A N D S ////////////////////
function bandsInTownAPI() {
    var artist = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryUrl, (err, response, body) => {
        if (err)
            return err;

        if (!err && response.statusCode === 200) {
            var bandChoice = JSON.parse(body);

            console.log(artist);
            console.log("Michael Jackson");
            console.log(response.statusCode === 200);
        }
    })
}

/////////////// S P O T I F Y //////////////////
function spotifyMe (){
    let track = process.argv.splice(3);
    if (!track){
        track = "Thriller"
    }
    spotify.search({type:'track', query: "Thiriller"}, function(err,data){
        if(!err){
            dispalySpotify();
        }
        else{
            throw err;
        }
    });
    
}


liriMeThis();