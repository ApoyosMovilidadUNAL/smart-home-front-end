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