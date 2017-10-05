angular.module('homeApp').directive('agregarVisita', agregarVisitaController );

//---------------------------------------------------------------------------------------------------
function agregarVisitaController(){
	return {
		scope: {},
		templateUrl: 'pages/visitas/agregar_visita.htm',
		controller: function($scope, $http, Authorization) {
			
			$scope.home_list = [];
			$scope.service_list = [];
			$scope.minDate = new Date();

			$http({
				method : 'GET',
				url : SERVER_ENDPOINT + '/hogar/consultarHogares'
			}).then(function(response) {
				$scope.home_list = response.data;
			}, function(error) {
				console.log(error);
			});

			$http({
				method : 'GET',
				url : SERVER_ENDPOINT + '/servicio/consultarServicios'
			}).then(function(response) {
				$scope.service_list = response.data;
			}, function(error) {
				console.log(error);
			});

			$scope.save =function() {
				$scope.visita.estado_servicio = "Adquirido";
				$scope.visita.fecha_visita_entrada = moment($scope.fecha).format('YYYY-MM-DD')
				if ( $scope.visita ) {
					$http({
						method : 'POST',
						url : SERVER_ENDPOINT + '/servicio/asignarServicioHogar',
						data : $scope.visita
					}).then(function(response) {
						console.log($scope.visita, response);
						Authorization.go('visitas')
					}, function(error) {
						console.log(error);
					});
				}
			}

		}
	}
}; 