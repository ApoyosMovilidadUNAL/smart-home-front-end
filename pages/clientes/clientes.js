angular.module("homeApp").directive('clientes', clientesController);

//--------------------------------------------------------

function clientesController() {

	return {

		scope: {},

		templateUrl : 'pages/clientes/clientes.htm',

		controller : [ '$scope', '$mdDialog', function($scope, $mdDialog) {

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

			$scope.addClient = function(ev) {
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'pages/clientes/dialog1.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				})
				.then(function(answer) {
					$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
					$scope.status = 'You cancelled the dialog.';
				});

				function DialogController($scope, $mdDialog) {
					$scope.hide = function() {
					$mdDialog.hide();
					};

					$scope.cancel = function() {
					$mdDialog.cancel();
					};

					$scope.answer = function(answer) {
					$mdDialog.hide(answer);
					};
				}
			};

			$scope.greeting = "Este es el clientes"
		}]};
};