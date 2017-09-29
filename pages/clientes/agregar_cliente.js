angular.module("homeApp").directive('agregarCliente', agregarclienteController);

//--------------------------------------------------------

function agregarclienteController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/agregarcliente.htm',

		controller : [ '$scope', '$state', function($scope, $state) {

			$scope.goBack = function () {
				$state.go('clientes');
			}

			$scope.save = function () {
				$state.go('clientes');
			}

			$scope.greeting = "Este es el clientes";

		}]};
};