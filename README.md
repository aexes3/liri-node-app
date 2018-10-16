# liri-node-app

LIRI is a language Interpretation and Recognition Interface. LIRI is a command line node APP that will take in parameters and give data back to you based on your input. 

This app is built with
*Node.js
*Bands In Town API
*OMDB API
*Spotify API

Using the console you can type:
*node liri concert-this (any band)
*node liri movie-this	(any movie)
*node liri spotify-this	(any song)
*node liri do-what-it-says

To get resules back for your searches.
------------------------------------------------

Movie-this will return these reuslts:

Title of the movie
Year the movie came out
Rotten Tomatoes Rating of the movie
IMDB Rating of the movie
Country where the movie was produced
Language of the movie
Plot of the movie
Actors in the movie

Example:


------------------------------------------------
Concert-this will return these results:

Artist:
Venue:
Location:
Date of the concert:

Example:


------------------------------------------------
Spotify-this will return these results:

Artist:
Song Title:
Album:
A preview link of the song from Spotify

Example:

------------------------------------------------

If a song, band, or movie is not entered you will get a prompt letting you know that something went wrong, you need to try again.

Every time one of these options is run, LIRI will log the resulting data into a file called log.txt.
------------------------------------------------

#Built With

*Node.js
*Bands In Town API
*OMDB API
*Spotify API

