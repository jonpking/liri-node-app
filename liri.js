require("dotenv").config();
const fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
const axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
const apiSelector = process.argv[2];
let searchTerm = process.argv.slice(3).join(" ");

console.log(apiSelector);
console.log(searchTerm);

switch (apiSelector) {

    // Bands in Town api search
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log("Venue Name: " + response.data[0].venue.name);
                console.log("Venue City: " + response.data[0].venue.city);
                console.log("Venue Region/State: " + response.data[0].venue.region);
                console.log("Venue Country: " + response.data[0].venue.country);
                console.log("Venue Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            });
        break;

    // Spotify api search
    case "spotify-this-song":
        spotify.search({ type: "track", query: searchTerm, limit: 1 }, function (err, data) {
            if (err) {
                return console.log("Error occured: " + err);
            }
            console.log("Track Name: " + data.tracks.items[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
        });
        break;

    // OMDB api search
    case "movie-this":
        if (!searchTerm) {
            searchTerm = "Mr. Nobody"
        }
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm)
            .then(function (response) {
                console.log(`Movie Title: ${response.data.Title}`);
                console.log(`Release Year: ${response.data.Year}`);
                console.log(`IMDB Rating: ${response.data.imdbRating}`);
                console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
                console.log(`Country Produced: ${response.data.Country}`);
                console.log(`Language: ${response.data.Language}`);
                console.log(`Plot: ${response.data.Plot}`);
                console.log(`Actors: ${response.data.Actors}`);
            });
        break;

    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            // console.log(data);
            const dataArr = data.split(",");
            console.log(dataArr);
            switch (dataArr[0]) {
                case "concert-this":
                    break;
                case "spotify-this-song":
                    break;
                case "movie-this":
                    break;
            }
        });
        break;
};