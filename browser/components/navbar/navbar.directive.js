'use strict';

app.directive('navbar', function ($state, $location, $http, $log, AuthFactory) {
  return {
    restrict: 'E',
    templateUrl: '/browser/components/navbar/navbar.html',
    link: function (scope) {
      scope.currentUser = AuthFactory.currentUser;

      // scope.getCurrentUser = AuthFactory.getCurrentUser;

      scope.pathStartsWithStatePath = function (state) {
        var partial = $state.href(state);
        var path = $location.path();
        return path.startsWith(partial);
      };
      scope.logout= function(){
        console.log("logout was clicked");
        $http.post('/logout/')
        .then(function(){
          console.log("SUCCESSFULLY LOGGED OUT");
          $state.go('home')
        })
        .catch($log.error);
      }
    }
  }






});
