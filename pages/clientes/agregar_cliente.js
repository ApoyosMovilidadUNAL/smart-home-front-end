angular.module("homeApp").directive('agregarCliente', agregarclienteController);

//--------------------------------------------------------

function agregarclienteController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/agregarcliente.htm',

		controller : [ '$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

			console.log($state.params)

			$scope.goBack = function () {
				$state.go('clientes');
			}

			$scope.save = function () {
				$state.go('clientes');
			}

			$scope.greeting = "Este es el clientes";

		}]};
};