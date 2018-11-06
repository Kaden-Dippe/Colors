var request = require('request')
var key = require('./key.js');
var SpotifyWebApi = require('spotify-web-api-node');

/*
 *  After receiving authentication from Spotify, perform a series of requests of the following:
 *      1. GET https://api.spotify.com/v1/search // perform search on artist to retrieve ID
 *      2. GET https://api.spotify.com/v1/artists/{id}/albums // retrieve an artist's entire discography
 *          - For each album: GET https://api.spotify.com/v1/albums/{id}/tracks
 *              - GET https://api.spotify.com/v1/audio-features (can parallelize getting 
 *                      audio features of every song in album)
 *              - Classify each song into a table consisting of colors based on select features.
 *                  - IF withinConstraints(song, color) is true: GET https://api.spotify.com/v1/tracks/{id} => retrieve song name
 *      
 *      ----- front-end
 *      
 *
 */

/*** The functions that will be called by app.js ***/


/*** Search for an artist by name ***/

/*** Once user verifies artist, search get songs based on that artists spotify Id




/**Returns spotiyApi object to make api calls***/
async function spotify_auth() {
  
  var spotifyApi = new SpotifyWebApi({
  clientId: key.client_id,
  clientSecret: key.client_secret,
  });

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
  return spotifyApi;
}

async function searchForArtist(name, spotifyApi) {
  var nameToId = {};
  try { 
    var data = await spotifyApi.searchArtists(name);
  } catch(err) {
    console.log(err);
  }

  data.body.artists.items.forEach(function(element) {
    nameToId[element.name] = element.id
    //console.log(element.name);
    });
  return nameToId;
}

async function actions() {
  spotifyApi = await spotify_auth();
  var nameToId = await searchForArtist("Drake", spotifyApi);
  //console.log(Object.keys(nameToId));
}


actions();

