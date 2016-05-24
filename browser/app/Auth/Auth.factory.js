app.factory('AuthFactory', function($http, $log, $state){
	var AuthFactory = {}; 

  $http.get('/auth/me')
  .then(function(res) {
    AuthFactory.currentUser = res.data;
  })
  .catch($log.error);

	AuthFactory.submitUser = function(user, path){
    $http.post(path, user)
		.then(function(user){
			$state.go('stories');
		})
		.catch($log.error);
	}

	return AuthFactory;

});
