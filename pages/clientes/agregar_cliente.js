angular.module("homeApp").directive('agregarCliente', agregarclienteController);

//--------------------------------------------------------

function agregarclienteController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/agregarcliente.htm',

		controller : [ '$scope', '$state', '$stateParams','$http','$rootScope', 'Authorization', function($scope, $state, $stateParams,$http,$rootScope, Authorization) {

			Authorization.check_session();

			console.log($state.params)

			$scope.goBack = function () {
				$state.go('clientes');
			}

			$scope.save = function () {
				console.log($scope.user);
				
				$http({
					method : 'POST',
					url : SERVER_ENDPOINT + '/cliente/crearCliente',
					data: $scope.user
				}).then(function(response) {
					//console.log(response);
					
				}, function(error) {
					console.log(error);
				});
				
				$state.go('clientes');
			}

			$scope.greeting = "Este es el clientes";

		}]};
};