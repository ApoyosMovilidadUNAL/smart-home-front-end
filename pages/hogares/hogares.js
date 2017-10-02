angular.module("homeApp").directive('hogares', hogaresController);

//--------------------------------------------------------

function hogaresController() {

	return {

		scope: {},

		templateUrl : 'pages/hogares/hogares.htm',

		controller : [ '$scope', '$http' , function($scope, $http) {

			$http({
				method : 'GET',
				url : SERVER_ENDPOINT + '/hogar/consultarHogares'
			}).then(function(response) {
				$scope.home_list = response.data;
			}, function(error) {
				console.log(error);
			});

			console.log($scope.home_list);
		}]};
};