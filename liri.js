require("dotenv").config();

/*Global Variables
==============================================================*/
//Packages and Modules
var fs = require('fs');
var spotify = require('node-spotify-api');
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
    let bandName = process.argv.splice(3);
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    request(queryUrl, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            let bandName = JSON.parse(body);

            console.log(bandName);
           console.log(body);
        }
    })
}

/////////////// S P O T I F Y //////////////////
function spotifyMe (){
    let track = process.argv.splice(3);
    spotify.search({type:'track', query: track}, function(err, data){
                    
        if(!err) {
          displaySpotify(data);
        }
     
        else {
          throw err;
        }
  });
  spotify.search({type:'track', query: "Thiriller"}, function(err,data){
      if(!err){
          dispalySpotify(data);
        }
        else{
            throw err;
        }
    });
}
function displaySpotify(data){
    var artists = data.tracks//.items[1].artists[0].name;             //['tracks']['items'][1]['artists'][0]['name'];
    var album = data.tracks//.items[1].artists[0].name;               //['tracks']['items'][1]['album']['name'];
    var songPreview = data.tracks//.items[1].externam_urls.spotify;   //['tracks']['items'][1]['external_urls']['spotify'];
    var track = data.tracks//.items[1].name;                          //['tracks']['items'][1]['name'];
    //Testing
    // console.log(JSON.stringify(data['tracks']['items'][1]['name'] ,null, 1));
    console.log('Artist: ' + artists);
    console.log('Track: ' + track);
    console.log('Album ' + album);
    console.log('Song Preview: ' + songPreview);
}

liriMeThis();