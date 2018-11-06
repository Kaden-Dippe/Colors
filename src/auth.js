var key = require('./key.js');
const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 8080;


var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: key.client_id,
  clientSecret: key.client_secret,
});



// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    //will get user input from a textbox
    var UserInput = "Drake";
    //dictionary of artists to Id
    var nameToId = {};

    searchForArtist(UserInput, nameToId)


      
    

    


  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);



/***Search for an artist based on current search, and then return artists that result
Create a dictionar mapping artist ***/
function searchForArtist(name, nameToId) {
    spotifyApi.searchArtists(name).then(function(data) {
        data.body.artists.items.forEach(function(element) {
          nameToId[element.name] = element.id
          //console.log(element.name);
          });

        return nameToId;
        //console.log(data.body.artists.items);
      }, function(err) {
        console.error(err);
        return nameToId;
      });
}




// get an artists albums
