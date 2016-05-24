var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var User = require('../../api/users/user.model');
var Story = require('../../api/stories/story.model');

router.post('/', function(req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function(user) {
    if (user) {
      req.session.user = user;
      req.session.userId = user.id;
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  }).catch(next)
})

module.exports = router;