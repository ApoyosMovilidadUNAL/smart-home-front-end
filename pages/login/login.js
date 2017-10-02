angular.module("homeApp").directive('login', loginController);

//--------------------------------------------------------

function loginController() {

	return {

		scope: {},

		templateUrl : 'pages/login/login.htm',

		controller : [ '$scope', 'Authorization', function($scope, Authorization) {

			Authorization.clear();

			$scope.greeting = "Este es el login"

			$scope.login = function() {
				console.log('mierda')
				Authorization.go('home');
			}
		}]};
};