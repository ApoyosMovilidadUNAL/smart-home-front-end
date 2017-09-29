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

//------------------------------------- MASTER CONTROLLER -----------------------------------
angular.module("homeApp").controller("MasterController", [ '$scope', '$rootScope', '$state', '$timeout',
			function ($scope, $rootScope, $state, $timeout) {
				$rootScope.menu = MENU;
				console.log($rootScope.menu)
 } ]);

angular.module('homeApp').config(['$stateProvider','$urlRouterProvider',
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
			}
		});

	});
}]);
angular.module("homeApp").directive('agregarCliente', agregarclienteController);

//--------------------------------------------------------

function agregarclienteController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/agregarcliente.htm',

		controller : [ '$scope', '$state', function($scope, $state) {

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
				$state.go('agregar-cliente');
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

		controller : [ '$scope', function($scope) {

			$scope.home_list = [
			{
				'direccion' : 'Calle falsa 123',
				'fecha_registro' : ' 14 Diciembre 2014 ',
				'client' : {
					'nombre' : ' Homero ',
					'apellido' : 'Simpson',
					'correo' : 'homerjsimpson@springfield.com'
				}
			},
			{
				'direccion' : 'Calle falsa 123',
				'fecha_registro' : ' 14 Diciembre 2014 ',
				'client' : {
					'nombre' : ' Homero ',
					'apellido' : 'Simpson',
					'correo' : 'homerjsimpson@springfield.com'
				}
			},
			{
				'direccion' : 'Calle falsa 123',
				'fecha_registro' : ' 14 Diciembre 2014 ',
				'client' : {
					'nombre' : ' Homero ',
					'apellido' : 'Simpson',
					'correo' : 'homerjsimpson@springfield.com'
				}
			}
			];

			console.log($scope.home_list);
		}]};
};
angular.module("homeApp").directive('home', homeController);

//--------------------------------------------------------

function homeController() {

	return {

		scope: {},

		templateUrl : 'pages/home/home.htm',

		controller : [ '$scope', function($scope) {
			$scope.greeting = "Este es el home"
		}]};
};
angular.module("homeApp").directive('login', loginController);

//--------------------------------------------------------

function loginController() {

	return {

		scope: {},

		templateUrl : 'pages/login/login.htm',

		controller : [ '$scope', function($scope) {
			$scope.greeting = "Este es el login"
		}]};
};
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


angular.module("homeApp").directive('menu', menuController);

//--------------------------------------------------------

function menuController() {

	return {

		scope: {},

		templateUrl : 'pages/menu/menu.htm',

		controller : [ '$scope', '$state', function($scope, $state) {

			$scope.go = function (path) {
				$state.go(path);
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