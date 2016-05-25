'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User= require('../api/users/user.model');

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));

// app.use('/api', function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   next();
// });
app.get('/session', function(req, res){
	res.send(req.user)
})

app.use(function (req, res, next) {
  console.log('session', req.user);
  next();
});

//wtf this is doing:
app.use(passport.initialize());
//piggying backing off req.session and put some properties on it
app.use(passport.session());

// Google authentication and login 
// //passport authenticate is a middleware that handlers the redirect 
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/stories' // or wherever
  })
);

passport.use(
  new GoogleStrategy({
    clientID: '798716272683-8kk3ah6gpreuqdrm3tjbt52kbns819bi.apps.googleusercontent.com',
    clientSecret: "ltaIhyXF1832iq5AmfMSmJ_0",
    callbackURL: '/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
   var info = {
     name: profile.displayName,
     email: profile.emails[0].value,
     photo: profile.photos ? profile.photos[0].value : undefined
   };
   User.findOrCreate({
     where: {googleId: profile.id},
     defaults: info
   })
   .spread(function (user) {
    console.log("LOOK OVER HERREEEEE FUCK" + user);
     done(null, user);
   })
   .catch(done);
   // console.log("i am hereeeeeeeeeee");
   // console.log('---', 'in verification callback', profile, '---');
  })
);

//Ok no wtf is this doing: ?
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(function (err) {
    done(err);
  });
});

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

app.use('/login', require('./login/login.session'));

app.get('/auth/me', function(req, res) {
  res.send(req.session.user);
})

app.post('/logout', function(req,res){

	req.session.destroy();
	res.sendStatus(201);
});




var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
