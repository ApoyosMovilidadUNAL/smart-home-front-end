angular.module("homeApp").directive('visitas', visitasController);

// --------------------------------------------------------

function visitasController() {

	return {

		scope : {},

		templateUrl : 'pages/visitas/visitas.htm',

		controller : [ '$scope', '$http', function($scope, $http) {
			$scope.greeting = "Este es el visitas"
			$scope.listaVisitasInstalacion = [];
			$scope.listaVisitasRetiro = [];
			$scope.listaVisitasFinalizadas = [];

			// ###########################################################################################
			$scope.consultarListaVisitasInstalacion = function() {
				$http({
					cache : false,
					method : 'GET',
					url : SERVER_ENDPOINT + '/servicio/consultarVisitasNuevas',
				}).then(function(response) {
					$scope.listaVisitasInstalacion = response.data;
					console.log($scope.listaHogarServicio)
				}, function(error) {
					console.log(error);
				});
			};

			// ###########################################################################################
			$scope.consultarListaVisitasRetiro = function() {
				$http({
					cache : false,
					method : 'GET',
					url : SERVER_ENDPOINT + '/servicio/consultarVisitasNuevas',
				}).then(function(response) {
					$scope.listaVisitasRetiro = response.data;
					console.log($scope.listaHogarServicio)
				}, function(error) {
					console.log(error);
				});
			};

			// ###########################################################################################
			$scope.consultarListaVisitasFinalizadas = function() {
				$http({
					cache : false,
					method : 'GET',
					url : SERVER_ENDPOINT + '/servicio/consultarVisitasNuevas',
				}).then(function(response) {
					$scope.listaVisitasFinalizadas = response.data;
					console.log($scope.listaHogarServicio)
				}, function(error) {
					console.log(error);
				});
			};
			// ###########################################################################################

			$scope.consultarListaVisitasInstalacion();

		} ]
	};
};