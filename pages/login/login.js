angular.module("homeApp").directive('login', loginController);

//--------------------------------------------------------

function loginController() {

	return {

		scope: {},

		templateUrl : 'pages/login/login.htm',

		controller : [ '$scope', function($scope) {
			$scope.greeting = "Este es el login"
		}]};
};