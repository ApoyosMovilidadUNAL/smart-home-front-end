angular.module("homeApp").directive('login', loginController);

//--------------------------------------------------------

function loginController() {

	return {

		scope: {},

		templateUrl : 'pages/login/login.htm',

		controller : [ '$scope', 'Authorization', function($scope, Authorization) {

			$scope.greeting = "Este es el login"

			$scope.login = function() {
				Authorization.go('home');
			}
		}]};
};