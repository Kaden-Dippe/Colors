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


async function spotify_auth() {
  try {
    var data = await spotifyApi.clientCredentialsGrant();
    console.log(data.body['expires_in'])
  } catch(err) {
    console.log(err);
  }
  try { 
    await spotifyApi.setAccessToken(data.body['access_token']);
  } catch(err) {
    console.log(err);
  }
}
/*
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
    var nameToId = searchForArtist(UserInput, nameToId);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);
*/
spotify_auth();


async function searchForArtist(name, spotifyApi) {
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
