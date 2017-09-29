angular.module("homeApp").directive('clientes', clientesController);

//--------------------------------------------------------

function clientesController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/clientes.htm',

		controller : [ '$scope', '$mdDialog', '$state', function($scope, $mdDialog, $state) {

			$scope.client_list = [
			{
				'nombre' : 'Jhader Manuel',
				'apellido' : 'Hurtado',
				'identificacion' : 123456789
			},
			{
				'nombre' : 'Omar Sneyder',
				'apellido' : 'Eraso',
				'identificacion' : 123456789
			},
			{
				'nombre' : 'Jesus David',
				'apellido' : 'Monroy',
				'identificacion' : 123456789
			}
			];

			$scope.go = function() {
				$state.go('agregar-cliente');
			}

			$scope.greeting = "Este es el clientes"
		}]};
};