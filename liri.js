/*Global Variables
==============================================================*/
//Packages and Modules
//var twitter = require('twitter');
require("dotenv").config();
var keys = require('./keys');
var fs = require('fs');
var request = require('request');
const chalk = require('chalk');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
let moment = require('moment');

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
    let artist = process.argv.splice(3, process.argv.length - 1).join(" ");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryUrl, (err, response, body) => {
        if (artist === "" || err) {
            console.log("Try again")
            return
        };

        if (!err && response.statusCode === 200) {
            let bandName = JSON.parse(body);

            for (let i = 0; i < 3; i++) {
                console.count('Concert #')

                let concert = (`
            ${(chalk.green("Artist: " + artist))}
            ${(chalk.yellow("Venue: " + bandName[i].venue.name))}
            ${(chalk.yellow("Location: " + bandName[i].venue.city + ", " + bandName[i].venue.region))}
            ${(chalk.yellow("Date: " + moment(bandName[i].datetime).format("MM/DD/YY")))}
            ${("\n==========================================\n")}
            `);

                console.log(concert);
            }
        }
        if (err) {
            console.log("Uuuuuuuuuh oh, you need to try again!")
        }
    })
}

/////////////// S P O T I F Y //////////////////
function spotifyMe() {
    let tuneQuery = process.argv.splice(3, process.argv.length - 1).join(" ");
        if(!tuneQuery){
            tuneQuery = "Thriller"
        }
        //why does this spotify package only accept track, not artist or album?
     spotify.search({ type: "track", query: tuneQuery}, (err, data) => {
        if (err) {
           console.log("SYup, I knew something like this would happen: " + err);
           return;
        }
        else {
            songInfo = (`
            ${(chalk.green("Song Title: " + tuneQuery))}
            ${(chalk.yellow("Artist: " + data.tracks.items[0].album.artists[0].name))}
            ${(chalk.yellow("Album: " + data.tracks.items[0].album.name))}
            ${(chalk.yellow("Spotify This Song: " + data.tracks.items[0].album.external_urls.spotify))}
            `);
    
            console.log(songInfo);
        }
   }) 
};

liriMeThis();