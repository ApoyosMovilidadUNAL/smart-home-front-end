angular.module("homeApp").directive('agregarHogar', agregarhogarController); 
 
//-------------------------------------------------------- 
 
function agregarhogarController() { 
 
  return { 
 
    scope: {}, 
 
    templateUrl : 'pages/hogares/agregarhogar.htm', 
 
    controller : [ '$scope', '$state', '$stateParams','$http','$timeout','variableCliente', function($scope, $state, $stateParams,$http,$timeout,variableCliente) { 
 
      $scope.consultarHogares=function(){
    	  console.log("hola");
    	  console.log(variableCliente.getListHogares()); 
    	  //$scope.home_list=variableCliente.getListHogares();
    	  var cliente=variableCliente.getVarCliente();
          	$http({
	  			method : 'POST',
	  			url : SERVER_ENDPOINT + '/hogar/consultarHogarPorCliente',
	  			data: cliente.id
	  		}).then(function(response) {
	  			$scope.home_list = response.data;
	  			//console.log($scope.hogares_list = response.data);
	  			
	  			variableCliente.setListHogares(response.data);
	  			console.log(variableCliente.getListHogares());
	  		}, function(error) {
	  			console.log(error);
	  		});
           
      }
      //console.log(variableCliente.getListHogares()); 
      $scope.ocultarAgregarHogar = true; 
 
      $scope.goBackHogar = function () { 
         
    	  $state.go('clientes');
      } 
 
      $scope.guardarHogar = function () { 
        if (markers.length < 1) {
        	alert("Agrege una ubicación")
        	return
		}
        var cliente=variableCliente.getVarCliente(); 
        $scope.hogar["ht_clente_id"] =cliente.id;
        $scope.hogar.ubicacion = posicionMarker ;
        $http({ 
          method : 'POST', 
          url : SERVER_ENDPOINT + '/hogar/crearHogarCliente', 
          data: $scope.hogar
        }).then(function(response) { 
        	$scope.consultarHogares();
        	$scope.ocultarAgregarHogar = true;
        	$scope.hogar.direccion="";
        	$scope.hogar.ubicacion="";
        	setMapOnAll(null);
		    markers = [];
        }, function(error) { 
          
        }); 
        
        
//        $state.go('clientes'); 
      } 
       
      $scope.agregarHogar= function(){ 
        
        if($scope.ocultarAgregarHogar==true){
        	$scope.ocultarAgregarHogar = false; 
        } else{
        	$scope.ocultarAgregarHogar = true;
        }
      } 
       
      
      $scope.consultarHogares();
 
      $scope.greeting = "Este es el clientes"; 
      
      
//      -------------------------------------------------------------------------------------
      	var map;
      	var markers = [];
      	var posicionMarker;
		$scope.showMap = function () {
				var myLatLng = {lat: 4.688475, lng: 1-74.117780};
				var mapdiv = document.getElementById('map');
				mapdiv.setAttribute('height', '75%');
				map = new google.maps.Map(mapdiv, {
					center: {lat: 4.688475, lng: -74.117780},
					zoom: 12
				});
//				 This event listener calls addMarker() when the map is clicked.
				  google.maps.event.addListener(map, 'click', function(event) {
					setMapOnAll(null);
				    markers = [];
				    addMarker(event.latLng, map);
				  });
				  $scope.consultarHogares()
				$timeout(function(){document.getElementById('map').setAttribute('height', '80%');}, 100);
		};
		
		// Sets the map on all markers in the array.
	      function setMapOnAll(map) {
	        for (var i = 0; i < markers.length; i++) {
	          markers[i].setMap(map);
	        }
	      }
		
		
		function addMarker(location, map) {
			  // Add the marker at the clicked location, and add the next-available label
			  // from the array of alphabetical characters.
			  var marker = new google.maps.Marker({
			    position: location,
			    map: map
			  });
			  var latitud = marker.getPosition().lat()
			  var longitud = marker.getPosition().lng()
			  posicionMarker = "{\"lat\":"+latitud+", \"lng\": "+longitud+"}" ;
			  console.log(posicionMarker)
			  markers.push(marker);
			}
		$scope.showMap();

//      -------------------------------------------------------------------------------------
      
      
    }]}; 
};