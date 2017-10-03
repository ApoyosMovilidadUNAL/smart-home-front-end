var SERVER_ENDPOINT = 'http://192.168.2.116:8090/SmartHomeServer';
var PAGES_PUBLIC = ['login']
var PAGES_PRIVATE = ['clientes', 'hogares', 'usuarios', 'home', 'mapa','visitas', 'agregar-cliente']


var MENU = [

	{ 
		'name' : 'Inicio',
		'icon' : 'home',
		'path' : 'home'
	},
	{ 
		'name' : 'Clientes',
		'icon' : 'account_circle',
		'path' : 'clientes'
	}, 
	{ 
		'name' : 'Hogares',
		'icon' : 'business',
		'path' : 'hogares'
	}, 
	{ 
		'name' : 'Mapa',
		'icon' : 'add_location',
		'path' : 'mapa'
	},
	{ 
		'name' : 'Usuarios',
		'icon' : 'person',
		'path' : 'usuarios'
	},
	{ 
		'name' : 'Visitas',
		'icon' : 'flight_takeoff',
		'path' : 'visitas'
	}
];
angular.module("homeApp",["ui.router", 'ngCookies', 'ngMessages','ngMaterial']);

angular.module("homeApp").service('Authorization', function($state, $rootScope, $http, $cookies) {

  this.authorized = false;
  this.memorizedState = null;
  // -------------------------------------------------------------------------------------------------------------------
  var
  clear = function() {
  	$http({
				method : 'POST',
				url : SERVER_ENDPOINT + '/logout',
				data : $rootScope.info
			}).then(function(response) {
				$rootScope.info = null;
				sessionStorage.removeItem('session_info');
				sessionStorage.removeItem('last_state');
				console.log(response.data)
			}, function(error) {
				console.log(error);
			});
    this.authorized = false;
    this.memorizedState = null;

  },
  login = function(user) {
  	if (sessionStorage.getItem('session_info') == null || typeof(sessionStorage.getItem('session_info')) == 'undefined' ) {
  		$http({
				method : 'POST',
				url : SERVER_ENDPOINT + '/login',
				data : user
			}).then(function(response) {
				$rootScope.info = response.data;
				sessionStorage.setItem("session_info", JSON.stringify($rootScope.info));
				go('home');
			}, function(error) {
				console.log(error);
			});
	    this.authorized = true;
	}else{
		$rootScope.info = sessionStorage.getItem('session_info');
  		$state.go(sessionStorage.getItem('last_state'))

	}
	
  },
  go = function(fallback){

  	if( sessionStorage.getItem('session_info') != null){
  		console.log('va por aqui');
  		this.authorized = true;
  		if ($rootScope.info != sessionStorage.getItem('session_info')) {
  			$rootScope.info = sessionStorage.getItem('session_info');
  		}
  		sessionStorage.setItem('last_state', fallback);
    	$state.go(fallback);
  	}else{
  		$state.go('/');
  	}

  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    clear: clear,
    go: go,
    login : login
  };
})

//------------------------------------- MASTER CONTROLLER -----------------------------------


angular.module("homeApp").controller("MasterController", [ '$scope', '$rootScope', '$state', '$timeout', '$cookies', 'Authorization', masterController ]);

function masterController($scope, $rootScope, $state, $timeout, $cookies, Authorization) {

	$rootScope.menu = MENU;
	console.log("Sesion : " + sessionStorage.getItem('session_info'));
	if (sessionStorage.getItem('last_state')) {
  		Authorization.go(sessionStorage.getItem('last_state'))
	} else {
		Authorization.go('/');
	}	

}
angular.module('homeApp')
.config(['$stateProvider','$urlRouterProvider',
	function ($stateProvider,$urlRouterProvider) {

	// ------------------------------------- DEFINIR RUTAS ----------------------------------
	$urlRouterProvider.otherwise('/');

	angular.forEach(PAGES_PRIVATE, function( value, key) {

		$stateProvider
		.state(value, {
			url : '/' + value,
			template : '<' + value + ' flex layout="row" params="data.params" ng-cloak />',
			controller: function ($scope, $stateParams) {
				$scope.data = {
					params : $stateParams
				}
			},
			data: {
		      authorization: true,
		      redirectTo: 'login'
		    }
		});

	});

}])

;
angular.module("homeApp").directive('agregarCliente', agregarclienteController);

//--------------------------------------------------------

function agregarclienteController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/agregarcliente.htm',

		controller : [ '$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

			console.log($state.params)

			$scope.goBack = function () {
				$state.go('clientes');
			}

			$scope.save = function () {
				$state.go('clientes');
			}

			$scope.greeting = "Este es el clientes";

		}]};
};
angular.module("homeApp").directive('clientes', clientesController);

//--------------------------------------------------------

function clientesController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/clientes.htm',

		controller : [ '$scope', '$mdDialog', '$state', function($scope, $mdDialog, $state) {

			$scope.client_list = [
			{
				'nombre' : 'Jhader Manuel',
				'apellido' : 'Hurtado',
				'identificacion' : 123456789
			},
			{
				'nombre' : 'Omar Sneyder',
				'apellido' : 'Eraso',
				'identificacion' : 123456789
			},
			{
				'nombre' : 'Jesus David',
				'apellido' : 'Monroy',
				'identificacion' : 123456789
			}
			];

			$scope.go = function() {
				$state.go('agregar-cliente',{'users':$scope.client_list});
			}

			$scope.greeting = "Este es el clientes"
		}]};
};
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
angular.module("homeApp").directive('home', homeController);

//--------------------------------------------------------

function homeController() {

	return {

		scope: {},

		templateUrl : 'pages/home/home.htm',

		controller : [ '$scope', '$http', 'Authorization', function($scope, $http, Authorization) {

			$scope.greeting = "Este es el home"
		}]};
};
angular.module("homeApp").directive('login', loginController);

//--------------------------------------------------------

function loginController() {

	return {

		scope: {},

		templateUrl : 'pages/login/login.htm',

		controller : [ '$scope', 'Authorization', function($scope, Authorization) {

			$scope.greeting = "Este es el login"

			$scope.login = function(user) {
				Authorization.login(user);
			}
		}]};
};
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


angular.module("homeApp").directive('menu', menuController);

//--------------------------------------------------------

function menuController() {

	return {

		scope: {},

		templateUrl : 'pages/menu/menu.htm',

		controller : [ '$scope', '$state', 'Authorization', function($scope, $state, Authorization) {

			$scope.go = function (path) {
				Authorization.go(path);
			};

			$scope.logout = function() {
				Authorization.clear()
			}

		}]};
};
angular.module("homeApp").directive('usuarios', usuariosController);

//--------------------------------------------------------

function usuariosController() {

	return {

		scope: {},

		templateUrl : 'pages/usuarios/usuarios.htm',

		controller : [ '$scope', function($scope) {
			$scope.greeting = "Este es el usuarios"
		}]};
};
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
					url : SERVER_ENDPOINT + '/servicio/consultarVisitasRetiro',
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
					url : SERVER_ENDPOINT + '/servicio/consultarVisitasFinalizadas',
				}).then(function(response) {
					$scope.listaVisitasFinalizadas = response.data;
					console.log($scope.listaHogarServicio)
				}, function(error) {
					console.log(error);
				});
			};
			// ###########################################################################################

			$scope.consultarListaVisitasInstalacion();
			$scope.consultarListaVisitasFinalizadas();
			$scope.consultarListaVisitasRetiro();
		} ]
	};
};