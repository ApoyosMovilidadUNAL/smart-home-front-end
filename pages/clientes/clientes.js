angular.module("homeApp").directive('clientes', clientesController);

//--------------------------------------------------------


angular.module("homeApp").service('variableCliente', function() {
    var varCliente = {};

    return {
        getVarCliente: function() {
            return varCliente;
        },
        setVarCliente: function(value) {
        	varCliente = value;
        }
    };
});

function clientesController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/clientes.htm',

		controller : [ '$scope', '$mdDialog', '$state','$http','variableCliente', function($scope, $mdDialog, $state,$http, variableCliente) {

			
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
			
			$scope.goAgregarHogar = function(cliente) {
				console.log("agregar hogar");
				console.log(cliente);
				variableCliente.setVarCliente(cliente);
				console.log(variableCliente.getVarCliente());
				$state.go('agregar-hogar');
				
			}
			
			

			$scope.greeting = "Este es el clientes"
		}]};
};