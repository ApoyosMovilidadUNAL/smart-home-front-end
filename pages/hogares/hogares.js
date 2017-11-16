angular.module("homeApp").directive('hogares', hogaresController);

//--------------------------------------------------------

angular.module("homeApp").service('hogarConsumo', function() {
    var varHogar = {};

    return {
        getVarHogar: function() {
            return varHogar;
        },
        setVarHogar: function(value) {
        	varHogar = value;
        }
    };
});


//--------------------------------------------------------

function hogaresController() {

	return {

		scope: {},

		templateUrl : 'pages/hogares/hogares.htm',

		controller : [ '$scope', '$http', 'Authorization', 'hogarConsumo', function($scope, $http, Authorization, hogarConsumo) {

			Authorization.check_session();

			$http({
				method : 'GET',
				url : SERVER_ENDPOINT + '/hogar/consultarHogaresInformacion'
			}).then(function(response) {
				$scope.home_list = response.data;
			}, function(error) {
				console.log(error);
			});

			console.log($scope.home_list);


			$scope.consultarConsumo = function(hogar){
				console.log(hogar)
				hogarConsumo.setVarHogar(hogar);

				
				console.log(hogarConsumo.getVarHogar())
				Authorization.go('ver-hogar');

			}

		}]};
};