angular.module("homeApp",["ui.router", 'ngCookies', 'ngMessages','ngMaterial']);

angular.module("homeApp").service('Authorization', function($state, $rootScope, $http, $cookies) {

  this.authorized = false;
  this.memorizedState = null;

  var
  clear = function() {
  	$http({
				method : 'POST',
				url : SERVER_ENDPOINT + '/logout',
				data : $rootScope.info
			}).then(function(response) {
				$rootScope.info = null;
				sessionStorage.removeItem('session_info') 
				console.log(response.data)
			}, function(error) {
				console.log(error);
			});
    this.authorized = false;
    this.memorizedState = null;

  },

  go = function(fallback) {
  	if (sessionStorage.getItem('session_info') == null || typeof(sessionStorage.getItem('session_info')) == 'undefined' ) {
  		$http({
				method : 'POST',
				url : SERVER_ENDPOINT + '/login',
				data : {
					"usuario" : "jmhurtadoc",
					"clave" : "93022506968"
				}
			}).then(function(response) {
				$rootScope.info = response.data;
				sessionStorage.setItem("session_info", JSON.stringify($rootScope.info));
				console.log(sessionStorage.getItem('session_info'));
			}, function(error) {
				console.log(error);
			});
	    this.authorized = true;
	}else{
		console.log("va por aca")
		$rootScope.info = sessionStorage.getItem('session_info');
		console.log($rootScope.info)

	}
	var targetState = this.memorizedState ? this.memorizedState : fallback;
    $state.go(targetState);
  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    clear: clear,
    go: go
  };
})

//------------------------------------- MASTER CONTROLLER -----------------------------------


angular.module("homeApp").controller("MasterController", [ '$scope', '$rootScope', '$state', '$timeout', '$cookies', 'Authorization', masterController ]);

function masterController($scope, $rootScope, $state, $timeout, $cookies, Authorization) {

	$rootScope.menu = MENU;
	

	$rootScope.$on('$stateChangeStart', function( event, toState, toParams, fromState, fromParams) {

		if (sessionStorage.getItem('session_info') == null || typeof(sessionStorage.getItem('session_info')) == 'undefined' ) {
			$state.go(toState)
		} else {
			Sstate.go('login')
		}

	})

}