angular.module("homeApp").directive('home', homeController);

//--------------------------------------------------------

function homeController() {

	return {

		scope: {},

		templateUrl : 'pages/home/home.htm',

		controller : [ '$scope', '$http', 'Authorization', function($scope, $http, Authorization) {

			$scope.greeting = "Este es el home"
		}]};
};