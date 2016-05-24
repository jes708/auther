app.controller('signupCtrl', function ($scope, $http, $state, $log, AuthFactory) {

	$scope.submitSignup= AuthFactory.submitUser;
});
 