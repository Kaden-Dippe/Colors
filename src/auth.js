var key = require('./key.js');
const express = require('express');
const request = require('request');
const app = express();
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: key.client_key,
      clientSecret: key.client_secret,
      callbackURL: 'http://localhost:8888/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(function() {
          console.log('Profile': profile);
          User.findOrCreate({
              where: {
                  SpotifyId: profile.id
              },
              defaults: {
                  name: profile.displayName,
                  SpotifyId: profile.id,
                  accessToken: accessToken,
                  proPic: profile.photos[0],
                  refreshToken: refreshToken
              }
          }).spread(function (user) {
              console.log('Making user: ', user);
              done(null, user);
          }).catch(done);
      });
    }
  )
);


