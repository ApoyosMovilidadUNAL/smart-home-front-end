angular.module("homeApp",["ui.router", 'ngCookies', 'ngMessages','ngMaterial']);

angular.module("homeApp").service('Authorization', function($state, $rootScope, $http) {

  this.authorized = false;
  this.memorizedState = null;
  // -------------------------------------------------------------------------------------------------------------------
  var
  clear = function() {
  	$http({
				method : 'POST',
				url : SERVER_ENDPOINT + '/logout',
				data : $rootScope.info
			}).then(function(response) {
				$rootScope.info = null;
				sessionStorage.removeItem('session_info');
				sessionStorage.removeItem('last_state');
				console.log(response.data)
			}, function(error) {
				console.log(error);
			});
    this.authorized = false;
    this.memorizedState = null;
  },
  login = function(user) {
  	if (sessionStorage.getItem('session_info') == null ) {
  		$http({
				method : 'POST',
				url : SERVER_ENDPOINT + '/login',
				data : user
			}).then(function(response) {
				$rootScope.info = response.data;
				sessionStorage.setItem("session_info", JSON.stringify($rootScope.info));
				go('home');
			}, function(error) {
				console.log(error);
			});
	    this.authorized = true;
	}else{
		$rootScope.info = sessionStorage.getItem('session_info');
  		$state.go(sessionStorage.getItem('last_state'))

	}
	
  },
  go = function(fallback){

  	if( sessionStorage.getItem('session_info') != null){
  		console.log('va por aqui');
  		this.authorized = true;
  		if ($rootScope.info != sessionStorage.getItem('session_info')) {
  			$rootScope.info = sessionStorage.getItem('session_info');
  		}
  		sessionStorage.setItem('last_state', fallback);
    	$state.go(fallback);
  	}else{
  		$state.go('/');
  	}

  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    clear: clear,
    go: go,
    login : login
  };
})

//------------------------------------- MASTER CONTROLLER -----------------------------------


angular.module("homeApp").controller("MasterController", [ '$scope', '$rootScope', '$state', '$timeout', 'Authorization', masterController ]);

function masterController($scope, $rootScope, $state, $timeout, Authorization) {

	$rootScope.menu = MENU;
	

}