
app.factory('AuthFactory', function($http, $log, $state){
	var AuthFactory= {}; 
	AuthFactory.submitUser= function(user, path){
		$http.post(path, user)
		.then(function(user){
			$state.go('stories');
		})
		.catch($log.error);
	}

	return AuthFactory;

});
