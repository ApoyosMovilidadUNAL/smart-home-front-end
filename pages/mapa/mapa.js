angular.module("homeApp").directive('mapa', mapaController);

//--------------------------------------------------------

function mapaController() {

	return {

		scope: {},

		templateUrl : 'pages/mapa/mapa.htm',

		controller : [ '$scope', '$state', '$timeout', function($scope, $state,$timeout) {

			$scope.greeting = "Aqui va el mapa";

			var map;
			$scope.showMap = function () {
					var myLatLng = {lat: 4.688475, lng: 1-74.117780};
					var mapdiv = document.getElementById('map');
					mapdiv.setAttribute('height', '75%');
					map = new google.maps.Map(mapdiv, {
						center: {lat: 4.688475, lng: -74.117780},
						zoom: 8
					});
					
					// This event listener calls addMarker() when the map is clicked.
					  google.maps.event.addListener(map, 'click', function(event) {
					    addMarker(event.latLng, map);
					  });
					
					var marker = new google.maps.Marker({
				          map: map,
				          position: myLatLng,
				          title: 'Hello World!'
				        });
					
					$timeout(function(){document.getElementById('map').setAttribute('height', '80%');}, 100);
			};
			
			function addMarker(location, map) {
				  // Add the marker at the clicked location, and add the next-available label
				  // from the array of alphabetical characters.
				  var marker = new google.maps.Marker({
				    position: location,
				    map: map
				  });
				  console.log(marker.position	)
				}
			
			

			$scope.showMap();


		}]};
};

