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
	},
	{
		'name' : 'Salir',
		'icon' : 'exit_to_app',
		'path' : 'login'
	}
];
angular.module("homeApp",["ui.router", 'ngCookies', 'ngMessages','ngMaterial']);

angular.module("homeApp").service('Authorization', function($state) {

  this.authorized = false;
  this.memorizedState = null;

  var
  clear = function() {
    this.authorized = false;
    this.memorizedState = null;
  },

  go = function(fallback) {
    this.authorized = true;
    var targetState = this.memorizedState ? this.memorizedState : fallback;
    $state.go(targetState);
  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    clear: clear,
    go: go
  };
})

//------------------------------------- MASTER CONTROLLER -----------------------------------


angular.module("homeApp").controller("MasterController", [ '$scope', '$rootScope', '$state', '$timeout', 'Authorization', masterController ]);

function masterController($scope, $rootScope, $state, $timeout, Authorization) {

	$rootScope.menu = MENU;

	$rootScope.$on('$stateChangeStart', function( event, toState, toParams, fromState, fromParams) {

	})

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

	$stateProvider
		.state('login', {
			url : '/login',
			template : '< login flex layout="row" params="data.params" ng-cloak />',
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

			Authorization.clear();

			$scope.greeting = "Este es el login"

			$scope.login = function() {
				console.log('mierda')
				Authorization.go('home');
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
					var mapdiv = document.getElementById('map');
					mapdiv.setAttribute('height', '75%');
					map = new google.maps.Map(mapdiv, {
						center: {lat: -34.397, lng: 150.644},
						zoom: 8
					});
					$timeout(function(){document.getElementById('map').setAttribute('height', '80%');}, 100);
			};

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

//--------------------------------------------------------

function visitasController() {

	return {

		scope: {},

		templateUrl : 'pages/visitas/visitas.htm',

		controller : [ '$scope', function($scope) {
			$scope.greeting = "Este es el visitas"
		}]};
};