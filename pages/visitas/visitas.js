angular.module("homeApp").directive('visitas', visitasController);

//--------------------------------------------------------

function visitasController() {

	return {

		scope: {},

		templateUrl : 'pages/visitas/visitas.htm',

		controller : [ '$scope', function($scope) {
			$scope.greeting = "Este es el visitas"
		}]};
};