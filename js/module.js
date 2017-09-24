angular.module("homeApp",["ui.router", 'ngCookies', 'ngMessages','ngMaterial']);

//------------------------------------- MASTER CONTROLLER -----------------------------------
angular.module("homeApp").controller("MasterController", [ '$scope', '$rootScope', '$state', '$timeout',
			function ($scope, $rootScope, $state, $timeout) {
				$rootScope.menu = MENU;
				console.log($rootScope.menu)
 } ]);
