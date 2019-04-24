var dotenv = require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var media = process.argv[3];
var log = "\n" + "Logged: " + command + " " + media


function commandReader() {
    fs.appendFile("log.txt", log, function (err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

    });

    switch (command) {

        case "concert-this":

            const queryURL = "https://rest.bandsintown.com/artists/" + media + "/events?app_id=codingbootcamp"

            axios.get(queryURL)
                .then(function (response) {

                    for (i = 0; i < 3; i++) {
                        var concerts = response.data;

                        console.log("\n");
                        console.log(media + " is playing at the: ")
                        console.log("Venue: " + concerts[i].venue.name);
                        console.log("Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country);
                        console.log("Date: " + moment(concerts[i].datetime).format("MM/DD/YYYY"));
                        console.log("-------------------------------");

                        //add moment js 


                    }
                })
                .catch(function (error) {
                    console.log(error);
                });


            break;

        case "spotify-this-song":

            spotify.search({
                type: 'track',
                query: media,
                limit: 1
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("\n");
                //artist
                console.log("Artist name is: " + data.tracks.items[0].album.artists[0].name);

                // song name
                console.log("Song name is: " + data.tracks.items[0].name);

                //album song is from
                console.log("Album name is: " + data.tracks.items[0].album.name);

                //preview link

                console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);


            });


            break;

        case "movie-this":

            const queryUrl1 = "https://www.omdbapi.com/?apikey=trilogy&t=" + media;

            axios.get(queryUrl1)
                .then(function (response) {

                    var movie = response.data;

                    //title
                    console.log("\n");

                    console.log("Title: " + movie.Title);


                    //year released
                    console.log("Year released: " + movie.Year);


                    //IMDB rating
                    console.log("IMDB rating: " + movie.Ratings[0].Value);

                    //rotten tomatoes rating
                    console.log("Rotten Tomatoes rating: " + movie.Ratings[1].Value);

                    //country produced
                    console.log("Country Produced in: " + movie.Country);

                    //language
                    console.log("Language: " + movie.Language);

                    //plot
                    console.log("Plot: " + movie.Plot);

                    //actors
                    console.log("Actors: " + movie.Actors);
                })
                .catch(function (error) {
                    console.log(error);
                });

            break;

        case "do-what-it-says":

            fs.readFile("random.txt", "utf8", function (error, data) {

                if (error) {
                    return console.log(error);
                }

                var dataArr = data.split(",");

                var importedMedia = dataArr[1];

                spotify.search({
                    type: 'track',
                    query: importedMedia,
                    limit: 1
                }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    console.log("\n");
                    //artist
                    console.log("Artist name is: " + data.tracks.items[0].album.artists[0].name);

                    // song name
                    console.log("Song name is: " + data.tracks.items[0].name);

                    //album song is from
                    console.log("Album name is: " + data.tracks.items[0].album.name);

                    //preview link

                    console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);


                });

            });

            break;

        case "commands":
            console.log("There are four commands you can type: 'concert-this, spotify-this-song, movie-this, do-what-it-says'");
            console.log("Write one of these commands follwed by an appropriate title. Ex: spotify-this-song 'The Ooz'");



            break;

        default:

            console.log("Can't recognize that command, please try again.");
            console.log("For a list of commands please type 'node liri.js commands'");




    }







}


commandReader(command);

