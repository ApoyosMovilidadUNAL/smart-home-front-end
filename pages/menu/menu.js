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