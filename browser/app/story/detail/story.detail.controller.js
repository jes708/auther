'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);

  $scope.currentUser = AuthFactory.currentUser;

  console.log($scope.currentUser)
  $scope.isAuthor = ($scope.currentUser.id === story.author_id);

  
  $scope.cl = function(va) {
    console.log(va)
  }

});
