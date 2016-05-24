var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');
var Story = require('../stories/story.model');

router.post('/login', function(req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function(user) {
    if (user) {
      req.session.userId = user.id;
      res.sendStatus(200)
    } else {
      res.sendStatus(401);
    }
  }).catch(next)
})