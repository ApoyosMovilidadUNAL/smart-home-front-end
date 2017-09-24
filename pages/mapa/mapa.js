angular.module("homeApp").directive('mapa', mapaController);

//--------------------------------------------------------

function mapaController() {

	return {

		scope: {},

		templateUrl : 'pages/mapa/mapa.htm',

		controller : [ '$scope', '$state', function($scope, $state) {

			$scope.greeting = "Aqui va el mapa";

			var map;
			$scope.showMap = function () {
					var mapdiv = document.getElementById('map');
					mapdiv.setAttribute('height', '75%');
					map = new google.maps.Map(mapdiv, {
					center: {lat: -34.397, lng: 150.644},
					zoom: 8
				});
			};

			$scope.showMap();


		}]};
};

