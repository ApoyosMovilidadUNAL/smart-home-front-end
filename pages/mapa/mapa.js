angular.module("homeApp").directive('mapa', mapaController);

//--------------------------------------------------------

function mapaController() {

	return {

		scope: {},

		templateUrl : 'pages/mapa/mapa.htm',

		controller : [ '$scope', '$state', '$timeout','$http', function($scope, $state,$timeout,$http) {

			$scope.greeting = "Aqui va el mapa";
			$scope.listaHogares = [];
			$scope.consultarHogares = function() {
				$http({
					cache : false,
					method : 'GET',
					url : SERVER_ENDPOINT + '/hogar/consultarHogares',
				}).then(function(response) {
					$scope.listaHogares = response.data;
					console.log($scope.listaHogares)
					for ( var casa in $scope.listaHogares) {
						var ubicacion = JSON.parse($scope.listaHogares[casa].ubicacion)
						console.log(ubicacion)
						var marker = new google.maps.Marker({
							map: map,
							position: ubicacion,
							title: 'Hello World!'
						});
					}
				}, function(error) {
					console.log(error);
				});
			};
			
			$scope.agregarMarkers = function(){
				
			}
			
			var map;
			$scope.showMap = function () {
					var myLatLng = {lat: 4.688475, lng: 1-74.117780};
					var mapdiv = document.getElementById('map');
					mapdiv.setAttribute('height', '75%');
					map = new google.maps.Map(mapdiv, {
						center: {lat: 4.688475, lng: -74.117780},
						zoom: 12
					});
//					 This event listener calls addMarker() when the map is clicked.
//					  google.maps.event.addListener(map, 'click', function(event) {
//					    addMarker(event.latLng, map);
//					  });
					  $scope.consultarHogares()
					$timeout(function(){document.getElementById('map').setAttribute('height', '80%');}, 100);
			};
			
			function addMarker(location, map) {
				  // Add the marker at the clicked location, and add the next-available label
				  // from the array of alphabetical characters.
				  var marker = new google.maps.Marker({
				    position: location,
				    map: map
				  });
				  var latitud = marker.getPosition().lat()
				  var longitud = marker.getPosition().lng()
				  console.log("{lat: " +latitud+", lng: "+longitud+"}")
				}
			$scope.showMap();
			
		}]};
};

