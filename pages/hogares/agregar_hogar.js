angular.module("homeApp").directive('agregarHogar', agregarhogarController); 
 
//-------------------------------------------------------- 
 
function agregarhogarController() { 
 
  return { 
 
    scope: {}, 
 
    templateUrl : 'pages/hogares/agregarhogar.htm', 
 
    controller : [ '$scope', '$state', '$stateParams','$http','variableCliente', function($scope, $state, $stateParams,$http,variableCliente) { 
 
      $scope.consultarHogares=function(){
    	  console.log("hola");
    	  console.log(variableCliente.getListHogares()); 
    	  $scope.home_list=variableCliente.getListHogares();
      }
      //console.log(variableCliente.getListHogares()); 
      $scope.ocultarAgregarHogar = true; 
 
      $scope.goBackHogar = function () { 
         
    	  $state.go('clientes');
      } 
 
      $scope.guardarHogar = function () { 
        
        var cliente=variableCliente.getVarCliente(); 
        $scope.hogar["ht_clente_id"] =cliente.id;
        
        $http({ 
          method : 'POST', 
          url : SERVER_ENDPOINT + '/hogar/crearHogarCliente', 
          data: $scope.hogar
        }).then(function(response) { 
        	
        }, function(error) { 
          
        }); 
         
        $state.go('clientes'); 
      } 
       
      $scope.agregarHogar= function(){ 
        
        if($scope.ocultarAgregarHogar==true){
        	$scope.ocultarAgregarHogar = false; 
        } else{
        	$scope.ocultarAgregarHogar = true;
        }
      } 
       
      
 
      $scope.greeting = "Este es el clientes"; 
 
    }]}; 
};