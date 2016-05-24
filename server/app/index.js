'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');

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
	res.send(req.session)
})

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
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
