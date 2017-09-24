angular.module("homeApp").directive('home', homeController);

//--------------------------------------------------------

function homeController() {

	return {

		scope: {},

		templateUrl : 'pages/home/home.htm',

		controller : [ '$scope', function($scope) {
			$scope.greeting = "Este es el home"
		}]};
};