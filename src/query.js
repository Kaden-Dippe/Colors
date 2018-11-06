var request = require('request')

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



