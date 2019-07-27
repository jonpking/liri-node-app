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
        concertThis(searchTerm);
        break;

    // Spotify api search
    case "spotify-this-song":
        spotifyThisSong(searchTerm);
        break;

    // OMDB api search
    case "movie-this":
        movieThis(searchTerm);
        break;

    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            // console.log(data);
            const dataArr = data.split(",");
            // console.log(dataArr);
            searchTerm = dataArr[1];
            switch (dataArr[0]) {
                case "concert-this":
                    concertThis(searchTerm);
                    break;
                case "spotify-this-song":
                    spotifyThisSong(searchTerm);
                    break;
                case "movie-this":
                    movieThis(searchTerm);
                    break;
            }
        });
        break;
};

function concertThis(searchTerm) {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {
            if (response.data[0].venue.name == undefined) {
                console.log("Venue Name: Not Available");
            } else {
                console.log("Venue Name: " + response.data[0].venue.name);
            }
            if (response.data[0].venue.city == undefined) {
                console.log("Venue City: Not Available");
            } else {
                console.log("Venue City: " + response.data[0].venue.city);
            }
            if (response.data[0].venue.region == undefined) {
                console.log("Venue Region/State: Not Available");
            } else {
                console.log("Venue Region/State: " + response.data[0].venue.region);
            }
            if (response.data[0].venue.country == undefined) {
                console.log("Venue Country: Not Available");
            } else {
                console.log("Venue Country: " + response.data[0].venue.country);
            }
            if (response.data[0].venue.datetime == undefined) {
                console.log("Venue Date: Not Available");
            } else {
                console.log("Venue Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            }
        });
};

function spotifyThisSong(searchTerm) {
    spotify.search({ type: "track", query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        }
        if (data.tracks.items[0].name == undefined) {
            console.log("Track Name: Not Available");
        } else {
            console.log("Track Name: " + data.tracks.items[0].name);
        }
        if (data.tracks.items[0].album.name == undefined) {
            console.log("Album Name: Not Available");
        } else {
            console.log("Album Name: " + data.tracks.items[0].album.name);
        }
        if (data.tracks.items[0].artists[0].name == undefined) {
            console.log("Artist(s): Not Available");
        } else {
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        }
        if (data.tracks.items[0].preview_url == undefined) {
            console.log("Preview URL: Not Available");
        } else {
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
        }
    });
};

function movieThis(searchTerm) {
    if (!searchTerm) {
        searchTerm = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm)
        .then(function (response) {
            if (response.data.Title == undefined) {
                console.log(`Movie Title: Not Available`);
            } else {
                console.log(`Movie Title: ${response.data.Title}`);
            }
            if (response.data.Year == undefined) {
                console.log(`Release Year: Not Available`);
            } else {
                console.log(`Release Year: ${response.data.Year}`);
            }
            if (response.data.imdbRating == undefined) {
                console.log(`IMDB Rating: Not Available`);
            } else {
                console.log(`IMDB Rating: ${response.data.imdbRating}`);
            }
            if (response.data.Ratings[1].Value == undefined) {
                console.log(`Rotten Tomatoes Rating: Not Available`);
            } else {
                console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            }
            if (response.data.Country == undefined) {
                console.log(`Country Produced: Not Available`);
            } else {
                console.log(`Country Produced: ${response.data.Country}`);
            }
            if (response.data.Language == undefined) {
                console.log(`Language: Not Available`);
            } else {
                console.log(`Language: ${response.data.Language}`);
            }
            if (response.data.Plot == undefined) {
                console.log(`Plot: Not Available`);
            } else {
                console.log(`Plot: ${response.data.Plot}`);
            }
            if (response.data.Actors == undefined) {
                console.log(`Actors: Not Available`);
            } else {
                console.log(`Actors: ${response.data.Actors}`);
            }
        });
};