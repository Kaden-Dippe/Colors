var request = require('request')
var key = require('./key.js');
var SpotifyWebApi = require('spotify-web-api-node');

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

/** 
* 
* @param {String} id The Spotify id of the Artist
* 
*/
async function getSongsAndColors(id) {
  var spotifyApi = await spotify_auth();
  var albums = await getAlbums(id, spotifyApi);
  var songFeatures = await getSongFeatures(albums, spotifyApi);
  

  return colors;
  
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



async function getSongFeatures(albums, spotifyApi) {
  var songFeatures = {};
  var songs = []
  var counter = 0
  try { 
    let data = await spotifyApi.getAlbums(albums);
    data.body.albums.forEach(function(album) {
      if (counter < 100 ) {
        album.tracks.items.some(function(song) {
          songs.push(song.id);
          songFeatures[song.id] = song.name;
          counter += 1;
          return counter >= 100;
        });
      }
    });
  } catch(err) {
    console.log(err);
  }

  if (songs != []) {
    try {
      var audioData = await spotifyApi.getAudioFeaturesForTracks(songs);
      for (let i = 0; i < 100; i ++) {
        var name = songFeatures[songs[i]];
        delete songFeatures[songs[i]];
        let data = audioData.body.audio_features[i];
        songFeatures[name] = data;
      }
    } catch(err) {
      console.log(err);
    }
  } else {
    console.log("This Artist has no songs");
  }

  return songFeatures;
}

function getColors(songFeatures) {

}


//searchByName("21 Savage");
getSongsAndColors('1URnnhqYAYcrqrcwql10ft');

