angular.module("homeApp",["ui.router", 'ngCookies', 'ngMessages','ngMaterial']);

angular.module("homeApp").service('Authorization', function($state, $rootScope, $http) {

  this.authorized = false;
  this.memorizedState = null;
  // -------------------------------------------------------------------------------------------------------------------
  var
  clear = function() {
  	if (sessionStorage.getItem('session_info') != null ) {
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
    }
    
    this.authorized = false;
    this.memorizedState = null;
  },
  login = function(user) {
  	if (sessionStorage.getItem('session_info') == null ) {
  		if ( typeof(user) != 'undefined' ) {
  			$http({
         method : 'POST',
         url : SERVER_ENDPOINT + '/login',
         data : user
       }).then(function(response) {
         console.log(response)
         if (response.data.token != null && response.data.token != "") {
           this.authorized = true;
           $rootScope.info = response.data;
           sessionStorage.setItem("session_info", JSON.stringify($rootScope.info));
           go('home');
         }else{
          alert("Usuario o constraseña invalido!")
          Authentication.clear();
          go('login');
          
        }
        
      }, function(error) {
       console.log(error);
     });
     }
     go('login')
     
   }else{
    $rootScope.info = sessionStorage.getItem('session_info');
    $state.go(sessionStorage.getItem('last_state'))
  }
  
},
go = function(fallback){

 if( sessionStorage.getItem('session_info') != null){
  this.authorized = true;
  if ($rootScope.info != sessionStorage.getItem('session_info')) {
   $rootScope.info = sessionStorage.getItem('session_info');
 }
 if (sessionStorage.getItem('last_state') != fallback) {
   sessionStorage.setItem('last_state', fallback);
 }
 console.log(sessionStorage.getItem('last_state'));
 $state.go(fallback);
}else{
  $state.go('login');
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
.config(function($mdDateLocaleProvider) {
  $mdDateLocaleProvider.formatDate = function(date) {
   return date ? moment(date).format('DD-MM-YYYY') : '';
 };

 $mdDateLocaleProvider.parseDate = function(dateString) {
   var m = moment(dateString, 'DD-MM-YYYY', true);
   return m.isValid() ? m.toDate() : new Date(NaN);
 };
});

//------------------------------------- MASTER CONTROLLER -----------------------------------


angular.module("homeApp").controller("MasterController", [ '$scope', '$rootScope', '$state', '$timeout', 'Authorization', masterController ]);

function masterController($scope, $rootScope, $state, $timeout, Authorization) {

	$rootScope.menu = MENU;
	Authorization.login();

}