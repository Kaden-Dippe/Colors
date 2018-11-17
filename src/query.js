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

/** THESE ARE FUNCTIONS THAT WILL BE CALLED BY APP.JS*/


/**
* Search for an artist by name 
*
* @param {String} name Artists name which was typed into search bar
* @return {Dictionary} nameToId Dictionary containing results of search. Key: name, Value: SpotifyId
*/
async function searchByName(name) {
	var spotifyApi = await spotify_auth();
	var nameToId = await searchForArtist(name, spotifyApi);
	return nameToId;
}

//

/** 
* 
* @param {String} id The Spotify id of the Artist
* 
*/
async function getSongData(id) {
  var spotifyApi = await spotify_auth();
  var albums = await getAlbums(id, spotifyApi);
  getSongs(albums, spotifyApi);

}

/**THESE ARE HELPER FUNCTIONS*/

/**
* Get a spotify API token to make spotify API calls
* 
* @return {Spotify API Object} spotifyApi Spotify API object to make API calls
*/
async function spotify_auth() {
  var spotifyApi = new SpotifyWebApi({
  clientId: key.client_id,
  clientSecret: key.client_secret,
  });

  try {
    var data = await spotifyApi.clientCredentialsGrant();
    //console.log(data.body['expires_in'])
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

/** 
* Create a Dictionary from searching for Artists. 
* Dictionary of names => SpotifyIds.
* 
* @param {String} name Artists name to search for 
* @param {Spotify API Object} spotifyApi Spotify API object to make API calls
* @return {Dictionary} nameToId Dictionary containing results of search. Key: name, Value: SpotifyId
*/
async function searchForArtist(name, spotifyApi) {
  var nameToId = {};
  try { 
    var data = await spotifyApi.searchArtists(name);
  } catch(err) {
    console.log(err);
  }

  data.body.artists.items.forEach(function(element) {
    nameToId[element.name] = element.id
    });
  return nameToId;
}


async function getAlbums(id, spotifyApi) {
  var albums = [];
  try { 
    var data = await spotifyApi.getArtistAlbums(id);
  } catch(err) {
    console.log(err);
  }
  
  data.body.items.forEach(function(element) {
    albums.push(element.id);
  });

  return albums;
}

//only getting first 100 songs
async function getSongs(albums, spotifyApi) {
  var songToFeatures = {};
  var songs = []
  var counter = 0
  try { 
    var data = await spotifyApi.getAlbums(albums);
    data.body.albums.forEach(function(element) {
      element.tracks.items.some(function(t) {
        songs.push(t.id);
        songToFeatures[t.id] = t.name;
        counter += 1;
        return counter >= 100;
      });
    });
    console.log(counter);
  } catch(err) {
    console.log(err);
  }

  //assume songs isn't empty


  console.log(songs.length);

  /*
  try {
      var audioData = await spotifyApi.getAudioFeaturesForTracks(songs.slice(0,100));

      audioData.body.audio_features.forEach(function(element) {
        console.log(element);
        var name = songToFeatures[song];
      });
    } catch(err) {
      console.log(err);
    }
    counter += 1;
  }

    */



  //newDict = {};

  //try 
  /*
    songs2.forEach(async function(song) { 
      try {
        var audioData = await spotifyApi.getAudioFeaturesForTrack(song);
        var name = songToFeatures[song];
        console.log(name);
        delete songToFeatures[song];
        newDict[name] = audioData.body;
        console.log(newDict);
      } catch(err) {
        console.log(err);
      }
    });

  */
  //console.log(newDict);
}


//searchByName("21 Savage");
getSongData('1URnnhqYAYcrqrcwql10ft');

