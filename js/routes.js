angular.module('homeApp')
.config(['$stateProvider','$urlRouterProvider',
	function ($stateProvider,$urlRouterProvider) {

	// ------------------------------------- DEFINIR RUTAS ----------------------------------
	$urlRouterProvider.otherwise('/');

	angular.forEach(PAGES_PRIVATE, function( value, key) {

		$stateProvider
		.state(value, {
			url : '/' + value,
			template : '<' + value + ' flex layout="row" params="data.params" ng-cloak />',
			controller: function ($scope, $stateParams) {
				$scope.data = {
					params : $stateParams
				}
			},
			data: {
		      authorization: true,
		      redirectTo: 'login'
		    }
		});

	});

	$stateProvider
		.state('login', {
			url : '/login',
			template : '< login flex layout="row" params="data.params" ng-cloak />',
			controller: function ($scope, $stateParams) {
				$scope.data = {
					params : $stateParams
				}
			},
			data: {
		      authorization: true,
		      redirectTo: 'login'
		    }
		});

}])

;