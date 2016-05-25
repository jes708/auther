'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);

  // AuthFactory.getCurrentUser()
  // .then(function(user) {
  //   $scope.currentUser = user;
  // })

  $scope.currentUser = AuthFactory.currentUser;
  
  $scope.cl = function(va) {
    console.log($scope.currentUser)
  }

});
