require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
const axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
const searchTerm = process.argv.slice(2).join(" ");

console.log(searchTerm);

// console.log(JSON.stringify(result, null, 2));

// Bands in Town
// axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
//     .then(function (response) {
//         console.log("Venue Name: " + response.data[0].venue.name);
//         console.log("Venue City: " + response.data[0].venue.city);
//         console.log("Venue Region/State: " + response.data[0].venue.region);
//         console.log("Venue Country: " + response.data[0].venue.country);
//         console.log("Venue Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
//     });

spotify.search({ type: "track", query: searchTerm, limit: 1 }, function (err, data) {
    if (err) {
        return console.log("Error occured: " + err);
    }
    console.log("Track Name: " + data.tracks.items[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Preview URL: " + data.tracks.items[0].preview_url);
});