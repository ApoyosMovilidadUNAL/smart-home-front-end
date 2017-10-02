angular.module("homeApp").directive('clientes', clientesController);

//--------------------------------------------------------

function clientesController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/clientes.htm',

		controller : [ '$scope', '$mdDialog', '$state','$http', function($scope, $mdDialog, $state,$http) {

			
			$http({
				method : 'GET',
				url : SERVER_ENDPOINT + '/cliente/consultarClientes'
			}).then(function(response) {
				$scope.client_list = response.data;
			}, function(error) {
				console.log(error);
			});

//			console.log($scope.home_list);
//			
//			$scope.client_list = [
//			{
//				'nombre' : 'Jhader Manuel',
//				'apellido' : 'Hurtado',
//				'identificacion' : 123456789
//			},
//			{
//				'nombre' : 'Omar Sneyder',
//				'apellido' : 'Eraso',
//				'identificacion' : 123456789
//			},
//			{
//				'nombre' : 'Jesus David',
//				'apellido' : 'Monroy',
//				'identificacion' : 123456789
//			}
//			];

			$scope.go = function() {
				$state.go('agregar-cliente',{'users':$scope.client_list});
			}

			$scope.greeting = "Este es el clientes"
		}]};
};