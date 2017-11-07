angular.module("homeApp").directive('verHogar', verHogar); 
 
//-------------------------------------------------------- 
 
function verHogar() { 
 
  return { 
 
    scope: {}, 
 
    templateUrl : 'pages/hogares/ver_hogar.htm', 
 
    controller : [ '$scope', '$state', '$stateParams','$http', 'Authorization', 'hogarConsumo', 
    		function($scope, $state, $stateParams, $http, Authorization, hogarConsumo) { 

    $scope.hogar = hogarConsumo.getVarHogar();
    console.log($scope.hogar)

    $http({
		method : 'POST',
		url : SERVER_ENDPOINT + '/cliente/consultarClientePorId',
		data: $scope.hogar.idCliente
	}).then(function(response) {
		$scope.cliente = response.data;
		console.log($scope.cliente)

		$http({
			method : 'POST',
			url : SERVER_ENDPOINT + '/consumo/obtenerConsumo',
			data : $scope.cliente.correo
		}).then(function(response) {
			$scope.hogar.consumo_total = response.data;
		}, function(error) {
			console.log(error);
		});
		
	}, function(error) {
		console.log(error);
	});


      
    }]}; 
};