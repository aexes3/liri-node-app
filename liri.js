require("dotenv").config();

let keys = require('./keys')
const chalk = require('chalk');


//var spotify = new Spotify(keys.spotify);


//-------Functions--------

//-------Movies---------
let request = require("request");
const movieName = process.argv.splice(2);
const bandName = process.argv.splice(2);
const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
const bandsapi = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


request(queryUrl, (err, response, body) =>{
   if( err )
       return err;

   if( response.statusCode === 200 ){
       let movieName = JSON.parse(body);

       console.log(chalk.yellow(movieName.tomatoURL))
       console.log(chalk.green('Movie Title: ' + movieName.Title))
       console.log(chalk.yellow('Year: ' + movieName.Year))
       console.log(chalk.yellow('Rated: ' + movieName.Rated))
       console.log(chalk.yellow('IMDB Rating: ' + movieName.imdbRating))
       console.log(chalk.yellow('Country: ' + movieName.Country))
       console.log(chalk.yellow('Languages: ' + movieName.Language))
       console.log(chalk.yellow('Plot: ' + movieName.Plot))
       console.log(chalk.yellow('Actors: ' + movieName.Actors))
   }
})
//--------Bands----
request(bandsapi, (err, response, body) => {
    if (err)
        return err;

    if (response.statusCode === 200) {
        let artist = JSON.parse(bandName.body);

        console.log(body)
    }
})