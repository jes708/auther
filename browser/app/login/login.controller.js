app.controller('loginCtrl', function ($scope, $http, $state, $log, AuthFactory) {

	$scope.submitLogin = AuthFactory.submitUser;


});
